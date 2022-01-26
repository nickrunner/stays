import { TurnedIn } from "@mui/icons-material";
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

    public async signOut(){
        await auth.signOut();
    }

    public async removeUser():Promise<void> {
        if(await this.isSignedIn()){
            if(auth.currentUser){
                await deleteUser(auth.currentUser);
            }
        }
        else{
            throw new Error("User is not signed in");
        }
    }

    public async isSignedIn(): Promise<boolean> {
        await this.waitForLoad(1000);
        if(auth.currentUser){
            console.log("Signed in as: "+auth.currentUser.email);
            return true;
        }
        return false;
    }

    private async delay(delayInMs: number) {
        return new Promise(resolve => {
            setTimeout(() => {
            resolve(2);
            }, delayInMs);
        });
    }

    private async waitForLoad(timeout: number) {
        let count: number = 0;
        while(!auth.currentUser){
            await this.delay(10);
            count = count + 10;
            if(count >= timeout){break;}
        }
    }

    public async getToken(timeout: number): Promise<string>{
       
        await this.waitForLoad(timeout);

        if(auth.currentUser){
            const token = await auth.currentUser.getIdToken();
            return token;
        }
        else{
            console.log("Auth: tried to get token on null user");
            throw new Error("Not signed in");
        }

    }
}