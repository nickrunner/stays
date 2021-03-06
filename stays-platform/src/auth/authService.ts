import { DecodedIdToken } from "firebase-admin/auth";

import { Error401 } from "../error";
import { auth } from "../firebase/firebase";
import { UserRecord } from "../models";

export class AuthService {
  private currentUser?: UserRecord;

  public async verifyToken(token: string): Promise<string> {
    try {
      const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
      //this.currentUser = await new UsersService().getUserByEmail(decodedToken.email as string);
      if (!decodedToken.email) {
        throw new Error401();
      }
      return decodedToken.email;
    } catch (e) {
      throw new Error401();
    }
  }

  public async getCurrentUserId(): Promise<string | undefined> {
    return this.currentUser ? await this.currentUser.id : undefined;
  }
}
