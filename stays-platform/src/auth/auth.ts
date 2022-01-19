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
        
        if(!request.headers.authorization){
          console.log("Authentication error: Auth header not found");
          throw new Error401();
        }
        let token = "";
        try{
          token = request.headers.authorization as string;
          token = token.replace("Bearer ", "");
        }
        catch{
          console.log("Authentication error: token not valid");
          throw new Error401();
        }
        
        const user: UserRecord = await new AuthService().verifyToken(token);
        if(!scopes){
          console.log("No scopes required... allow");
            return user;
        }
        if(scopes.length <= 0){
          console.log("No scopes required... allow");
          return user;
        }
        const roles = scopes as Role[]
        for(const role of roles){
            if(!user.roles.includes(role)){
                console.log("Authentication error. Action requires role: "+role);
                throw new Error401();
            }
        } 
        return user;
      }
      catch(e){
          console.log("Authentication error: ", {e});
          throw new Error401();
      }
  }
  
}