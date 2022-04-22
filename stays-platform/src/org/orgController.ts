import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Path,
  Post,
  Put,
  Query,
  Request,
  Route,
  Security
} from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Org, OrgRecord, Role } from "../models";
import { OrgService } from "./orgService";

@Route("orgs")
export class OrgController extends Controller {
  @Get()
  @Security("user", [Role.Admin])
  public async getOrgs(@Query() name?: string): Promise<OrgRecord[]> {
    console.log("orgController.getOrgs(): ");
    try {
      if (name) {
        return [await new OrgService().getOrgByName(name)];
      }
      return await new OrgService().getOrgs();
    } catch (err) {
      console.log("Failed getting orgs");
      throw err;
    }
  }

  @Post()
  @Security("user")
  public async postOrg(@Body() org: Org): Promise<OrgRecord> {
    console.log("orgController.createOrg(): " + JSON.stringify(org, null, 2));
    try {
      return await new OrgService().createOrg(org);
    } catch (err) {
      console.log("Failed creating org");
      throw err;
    }
  }

  @Get("/{orgId}")
  @Security("user", [Role.Host])
  public async getOrg(@Path() orgId: string): Promise<OrgRecord> {
    console.log("orgController.getOrg(): " + orgId);
    try {
      return await new OrgService().getOrgById(orgId);
    } catch (err) {
      console.log("Failed getting org");
      throw err;
    }
  }

  @Patch("/{orgId}")
  @Security("user", [Role.Host])
  public async editOrg(@Path() orgId: string, @Body() org: Org): Promise<void> {
    console.log("orgController.editOrg(): " + JSON.stringify(org, null, 2));
    try {
      return await new OrgService().updateOrg(orgId, org);
    } catch (err) {
      console.log("Failed updating org");
      throw err;
    }
  }

  @Put("{orgId}/users/{userId}")
  @Security("user", [Role.Host])
  public async addUserToOrg(@Path() orgId: string, @Path() userId: string): Promise<void> {
    console.log("orgController.addUserToOrg(): " + orgId + " " + userId);
    try {
      return await new OrgService().addUserToOrg(orgId, userId);
    } catch (err) {
      console.log("Failed adding user to org");
      throw err;
    }
  }

  @Delete("{orgId}/users/{userId}")
  @Security("user", [Role.Host])
  public async removeUserFromOrg(@Path() orgId: string, @Path() userId: string): Promise<void> {
    try {
      return await new OrgService().removeUserFromOrg(orgId, userId);
    } catch (err) {
      console.log("Failed removing user from org");
      throw err;
    }
  }

  @Put("{orgId}/stays/{stayId}")
  @Security("user", [Role.Host])
  public async addStayToOrg(@Path() orgId: string, @Path() stayId: string): Promise<void> {
    try {
      return await new OrgService().addStayToOrg(orgId, stayId);
    } catch (err) {
      console.log("Failed adding user to org");
      throw err;
    }
  }

  @Delete("{orgId}/stays/{stayId}")
  @Security("user", [Role.Host])
  public async removeStayFromOrg(@Path() orgId: string, @Path() stayId: string): Promise<void> {
    try {
      return await new OrgService().removeStayFromOrg(orgId, stayId);
    } catch (err) {
      console.log("Failed removing user from org");
      throw err;
    }
  }
}
