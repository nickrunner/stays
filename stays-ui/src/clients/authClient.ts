import { create } from "domain";
import { getAuth, deleteUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import {auth} from "../firebase";

export class AuthClient {
    
    public async signUp(email:string, password: string): Promise<UserCredential>
    {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    }

    public async signIn(email: string, password: string):Promise<UserCredential>
    {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    }

    public async removeUser():Promise<void> {
        if(auth.currentUser){
            await deleteUser(auth.currentUser)
        }
        else{
            throw new Error("User is not signed in");
        }

    }

    public async getToken(): Promise<string>{
        if(auth.currentUser){
            const token = await auth.currentUser.getIdToken();
            return token;
        }
        else{
            throw new Error("Not signed in");
        }

    }
}