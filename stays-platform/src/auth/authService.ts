import { DecodedIdToken } from "firebase-admin/auth";
import { UserRecord } from "../../../common/models/user";
import { Error401 } from "../error";
import { auth } from "../firebase/firebase";
import { UsersService } from "../users/usersService";
import { Token } from "./token";

export class AuthService {

    private currentUser?: UserRecord;

    public async verifyToken(token: string): Promise<string | undefined> {
        try{
            const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
            //this.currentUser = await new UsersService().getUserByEmail(decodedToken.email as string);
            return decodedToken.email;
        }
        catch(e){
            throw new Error401();
        }
    }

    public async getCurrentUserId(): Promise<string | undefined> {
        return this.currentUser ? await this.currentUser.id : undefined;
    }

    
}