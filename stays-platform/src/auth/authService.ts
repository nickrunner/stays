import { DecodedIdToken } from "firebase-admin/auth";
import { UserRecord } from "../../../common/models/user";
import { Error401 } from "../error";
import { auth } from "../firebase/firebase";
import { UsersService } from "../users/usersService";
import { Token } from "./token";

export class AuthService {

    public async verifyToken(token: string): Promise<UserRecord> {
        try{
            const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);
            return await new UsersService().getUserByEmail(decodedToken.email as string);
        }
        catch(e){
            throw new Error401();
        }
        
    }
}