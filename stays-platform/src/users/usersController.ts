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

import { User, UserRecord, Role, StayerMembership, HostMembersip } from "../../../common/models/user";
import { AuthenticatedRequest } from "../auth/auth";
import { Error401 } from "../error";
import { UsersService } from "./usersService";

@Route("users")
export class UsersController extends Controller {
    

    @Security("user", ["Stayer"])
    @Get("/self")
    public async getSelf(
        @Request() req: AuthenticatedRequest
    ): Promise<UserRecord> {
        console.log("GET", "/users/self");
        if(!req.self){
            console.log("User is not signed in!");
            throw new Error401("Not signed in");
        }
        const user: UserRecord = req.self;
        return user;
    }

    @Security("user")
    @Get()
    public async getUsers(
        @Query() userId?: string,
        @Query() email?: string ,
        @Query() firstName?: string,
        @Query() lastName?: string, 
        @Query() stayerMembership?: StayerMembership,
        @Query() hostMembership?: HostMembersip,
        @Query() role?: Role, 
        @Query() or?: boolean,
    ): Promise<UserRecord[]> {
        console.log("GET", "/users");
        const filters = {
            id: userId,
            email: email,
            firstName: firstName,
            lastName: lastName,
            stayerMembership: stayerMembership,
            HostMembersip: hostMembership,
            role: role
        }
        return await new UsersService().getUsers(filters, or);
    }

    @Post()
    @Security("user")
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
    public async updateUser(
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