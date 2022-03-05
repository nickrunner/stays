import {
  createUserWithEmailAndPassword,
  deleteUser,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  UserCredential
} from "firebase/auth";

import { User } from "../../../common/models/User";
import { auth } from "../firebase";
import { UserClient } from "./userClient";

export class AuthClient {
  public async signUp(email: string, password: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential;
  }

  public async signIn(email: string, password: string): Promise<UserCredential> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential;
  }

  public async signOut() {
    await auth.signOut();
  }

  public async removeUser(): Promise<void> {
    if (await this.isSignedIn()) {
      if (auth.currentUser) {
        await deleteUser(auth.currentUser);
      }
    } else {
      throw new Error("User is not signed in");
    }
  }

  public async isEmailValid(email: string) {
    try {
      await fetchSignInMethodsForEmail(auth, email);
    } catch (err: any) {
      if (err.code === "auth/invalid-email") {
        return false;
      }
    }
    return true;
  }

  public async isSignedIn(): Promise<boolean> {
    await this.waitForLoad(1000);
    if (auth.currentUser) {
      let user: User;
      try {
        user = await new UserClient().getSelf();
        console.log("Signed in as: " + auth.currentUser.email);
        return user != undefined;
      } catch {
        return false;
      }
    }
    return false;
  }

  private async delay(delayInMs: number) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(2);
      }, delayInMs);
    });
  }

  private async waitForLoad(timeout: number) {
    let count = 0;
    while (!auth.currentUser) {
      await this.delay(10);
      count = count + 10;
      if (count >= timeout) {
        break;
      }
    }
  }

  public async getToken(timeout: number): Promise<string> {
    await this.waitForLoad(timeout);

    if (auth.currentUser) {
      const token = await auth.currentUser.getIdToken();
      return token;
    } else {
      console.log("Auth: tried to get token on null user");
      throw new Error("Not signed in");
    }
  }
}
