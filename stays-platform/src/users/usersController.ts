/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Request,
  Route,
  Security
} from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Error401 } from "../error";
import { Role, User, UserRecord } from "../models";
import { StaysService } from "../stays/staysService";
import { UsersService } from "./usersService";

@Route("users")
export class UsersController extends Controller {
  @Security("user", [Role.Stayer])
  @Get("/self")
  public async getSelf(@Request() req: AuthenticatedRequest): Promise<UserRecord> {
    console.log("GET", "/users/self");
    if (!req.thisUser) {
      console.log("User is not signed in!");
      throw new Error401("Not signed in");
    }
    const user: UserRecord = req.thisUser;
    return user;
  }

  @Security("user")
  @Get()
  public async getUsers(@Query() filter?: string): Promise<UserRecord[]> {
    console.log("GET", "/users");
    if (filter) {
      return await new UsersService().getUsers(JSON.parse(filter));
    } else {
      return await new UsersService().getUsers();
    }
  }

  @Post()
  @Security("firebase")
  public async createUser(
    @Request() req: AuthenticatedRequest,
    @Body() user: User
  ): Promise<UserRecord> {
    console.log("POST /users with body ", { user });
    try {
      return await new UsersService().createUser(user, req.email);
    } catch (e) {
      console.log("createUser() Error: " + e);
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
    try {
      const userService = new UsersService();
      await userService.updateUser(userId, user);
      return await userService.getUserById(userId);
    } catch (e) {
      console.log("updateUser() Error: " + e);
      throw e;
    }
  }

  @Post("/favorites/{stayId}")
  @Security("user", [Role.Stayer])
  public async addFavorite(
    @Request() req: AuthenticatedRequest,
    @Path() stayId: string
  ): Promise<void> {
    try {
      if (req.thisUser) {
        await new UsersService().addFavorite(req.thisUser.id, stayId);
      } else {
        throw new Error401();
      }
    } catch (e) {
      console.log("addFavorites() error: " + e);
      throw e;
    }
    try {
      new StaysService().incrementFavoriteCount(stayId);
    } catch {
      console.log("Failed incrementing stay favorite count");
    }
  }

  @Delete("/favorites/{stayId}")
  @Security("user", [Role.Stayer])
  public async removeFavorite(
    @Request() req: AuthenticatedRequest,
    @Path() stayId: string
  ): Promise<void> {
    try {
      if (req.thisUser) {
        await new UsersService().removeFavorite(req.thisUser.id, stayId);
      } else {
        throw new Error401();
      }
    } catch (e) {
      console.log("addFavorites() error: " + e);
      throw e;
    }
    try {
      new StaysService().decrementFavoriteCount(stayId);
    } catch {
      console.log("Failed decrementing stay favorite count");
    }
  }

  @Patch("{userId}")
  @Security("user", [Role.Admin])
  public async patchUser(@Path() userId: string, @Body() attributes: any): Promise<void> {
    try {
      await new UsersService().updateUser(userId, attributes);
    } catch (e) {
      console.log("patchUser() Error: " + e);
      throw e;
    }
  }

  @Delete("{userId}")
  public async deleteUser(@Path() userId: string): Promise<void> {
    try {
      await new UsersService().deleteUser(userId);
    } catch (e) {
      console.log("deleteUser() Error: " + e);
      throw e;
    }
  }
}
