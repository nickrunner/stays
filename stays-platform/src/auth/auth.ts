import * as express from "express";
import { UsersController } from "../users/usersController";
import { UsersService } from "../users/usersService";
import {getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthService } from "./authService";
import { Role, UserRecord } from "../../../common/models/user";
import { Error401 } from "../error";

export interface AuthenticatedRequest extends express.Request{
  email?: string,
  self?: UserRecord
}


export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<express.Request> {
  if( securityName == "user"){
      const authenticatedRequest: AuthenticatedRequest = request;
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
        const email: string | undefined = await new AuthService().verifyToken(token);
        if(!email){
          console.log("No email associated with this token... not authorized");
          throw new Error401();
        }
        authenticatedRequest.email = email;
        
        if(!scopes){
          console.log("No scopes required... allow");
            return authenticatedRequest;
        }
        if(scopes.length <= 0){
          console.log("No scopes required... allow");
          return authenticatedRequest;
        }
        const user: UserRecord = await new UsersService().getUserByEmail(email);
        authenticatedRequest.self = user;
        
        authenticatedRequest.email = user.email;
        const roles = scopes as Role[]
        for(const role of roles){
            if(!user.roles.includes(role)){
                console.log("Authentication error. Action requires role: "+role);
                throw new Error401();
            }
        } 
        return authenticatedRequest;
      }
      catch(e){
          console.log("Authentication error: ", {e});
          throw new Error401();
      }
  }

  return request;
  
}