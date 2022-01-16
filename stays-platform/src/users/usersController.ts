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
    Security
  } from "tsoa";

import { User, UserRecord, Membership, Role } from "../../../common/models/user";
import { UsersService } from "./usersService";

@Route("users")
export class UsersController extends Controller {
    
    @Get("{userId}")
    public async getUserById(
        @Path() userId: string,
    ): Promise<UserRecord> {
        try{
            return await new UsersService().getUserById(userId)
        }
        catch(e){
            console.log("user: "+userId+" not found");
            throw e;
        }
        
    }

    @Security("user", ["Admin"])
    @Get()
    public async getUsers(
        @Query() email?: string ,
        @Query() firstName?: string,
        @Query() lastName?: string, 
        @Query() membership?: Membership,
        @Query() role?: Role, 
        @Query() or?: boolean
    ): Promise<UserRecord[]> {
        const filters = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            membership: membership,
            role: role
        }
        return await new UsersService().getUsers(filters, or);
    }

    @Post()
    public async createUser(
        @Body() user: User
    ): Promise<UserRecord> {
        console.log("POST /users with body ", {user});
        try{
            return await new UsersService().createUser(user);
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