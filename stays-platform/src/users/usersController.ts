import { response } from "express";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    Query,
    Patch,
    Delete,
    Security,
    Request
  } from "tsoa";

import { User, UserRecord, Role } from "../../../common/models/user";
import { AuthenticatedRequest } from "../auth/auth";
import { Error401 } from "../error";
import { UsersService } from "./usersService";

@Route("users")
export class UsersController extends Controller {

    @Security("user", [Role.Stayer])
    @Get("/self")
    public async getSelf(
        @Request() req: AuthenticatedRequest
    ): Promise<UserRecord> {
        console.log("GET", "/users/self");
        if(!req.thisUser){
            console.log("User is not signed in!");
            throw new Error401("Not signed in");
        }
        const user: UserRecord = req.thisUser;
        return user;
    }

    @Security("user")
    @Get()
    public async getUsers(
        @Query() filter?: string
    ): Promise<UserRecord[]> {
        console.log("GET", "/users");
        if(filter){
            return await new UsersService().getUsers(JSON.parse(filter));
        }
        else{
            return await new UsersService().getUsers();
        }
        
    }

    @Post()
    @Security("firebase")
    public async createUser(
        @Request() req: AuthenticatedRequest,
        @Body() user: User
    ): Promise<UserRecord> {
        console.log("POST /users with body ", {user});
        try{
            return await new UsersService().createUser(user, req.email);
        }
        catch(e){
            console.log("createUser() Error: "+e);
            throw e;
        }
    }

    @Post("{userId}")
    @Security("user")
    public async updateUser(
        @Request() req: AuthenticatedRequest,
        @Path() userId: string,
        @Body() user: User
    ): Promise<UserRecord> {
        try{
            const userService = new UsersService();
            await userService.updateUser(userId, user);
            return await userService.getUserById(userId);
        }
        catch(e){
            console.log("updateUser() Error: "+e);
            throw e;
        }
    }

    @Patch("{userId}")
    @Security("user", [Role.Admin])
    public async patchUser(
        @Path() userId: string,
        @Body() attributes: any
    ): Promise<void> {
        try{
            await new UsersService().updateUser(userId, attributes);
        }
        catch(e){
            console.log("patchUser() Error: "+e);
            throw e;
        }
    }

    @Delete("{userId}")
    public async deleteUser(
        @Path() userId: string
    ): Promise<void> {
        try{
            await new UsersService().deleteUser(userId);
        }
        catch(e){
            console.log("deleteUser() Error: "+e);
            throw e;
        }
    }
    
}