import * as express from "express";
import { UsersController } from "../users/usersController";
import { UsersService } from "../users/usersService";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from "./authService";
import { Role, UserRecord } from "../../../common/models/user";
import { Error401 } from "../error";

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if( securityName == "user"){
      try{
        console.log("Performing user authentication for scopes: ", {scopes});
        const user: UserRecord = await new AuthService().verifyToken(request.headers["Authorization"] as string);
        if(!scopes){
            return user;
        }
        const roles = scopes as Role[]
        for(const role of roles){
            if(!user.roles.includes(role)){
                throw new Error401();
            }
        } 
        return user;
      }
      catch(e){
          throw new Error401();
      }
  }
  
}