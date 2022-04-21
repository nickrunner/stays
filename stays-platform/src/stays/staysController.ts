/* eslint-disable @typescript-eslint/no-explicit-any */
import e from "express";
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
import { Role, Stay, StayRecord, StayRejectionInfo } from "../models";
import { OrgService } from "../org/orgService";
import { StayAttributesService } from "./stayAttributes/stayAttributesService";
import { StaysService } from "./staysService";

@Route("stays")
export class StaysController extends Controller {
  @Get("{stayId}")
  public async getStayById(@Path() stayId: string): Promise<StayRecord> {
    try {
      return await new StaysService().getStayById(stayId);
    } catch (e) {
      console.log("stay: " + stayId + " not found");
      throw e;
    }
  }

  @Get()
  public async getStays(
    @Query() search?: string,
    @Query() filter?: string,
    @Query() pagination?: string
  ): Promise<StayRecord[]> {
    search = search ? search : "";
    const parsedFilter = filter ? JSON.parse(filter) : {};
    const parsedPagination = pagination ? JSON.parse(pagination) : null;
    try {
      return await new StaysService().getStays(search, parsedFilter, parsedPagination);
    } catch (e) {
      console.log("Error getting stays: ", { e });
      throw e;
    }
  }

  @Get("/favorites")
  @Security("user", [Role.Stayer])
  public async getFavorites(@Request() req: AuthenticatedRequest): Promise<StayRecord[]> {
    try {
      console.log("staysController getFavorites()");
      if (!req.thisUser) {
        throw new Error401();
      }
      return await new StaysService().getUsersFavoriteStays(req.thisUser);
    } catch (err) {
      console.log("getFavorites() Error: " + e);
      throw e;
    }
  }

  @Post()
  @Security("user", [Role.Admin])
  public async createStay(@Body() stay: Stay): Promise<StayRecord> {
    console.log("POST /stays with body ", { stay });
    try {
      const stayRecord: StayRecord = await new StaysService().createStay(stay);
      await new OrgService().addStayToOrg(stayRecord.organizationId, stayRecord.id);
      await new StayAttributesService().addStayAttributesFromStay(stayRecord);
      return stayRecord;
    } catch (e) {
      console.log("createStay() Error: " + e);
      throw e;
    }
  }

  @Post("/{stayId}")
  @Security("user", [Role.Admin])
  public async updateStay(@Path() stayId: string, @Body() stay: Stay): Promise<StayRecord> {
    try {
      const stayService = new StaysService();
      await stayService.updateStay(stayId, stay);
      return await stayService.getStayById(stayId);
    } catch (e) {
      console.log("updateStay() Error: ", { e });
      throw e;
    }
  }

  @Patch("/{stayId}")
  @Security("user", [Role.Admin])
  public async patchStay(@Path() stayId: string, @Body() attributes: any): Promise<StayRecord> {
    try {
      const stayService = new StaysService();
      await stayService.updateStay(stayId, attributes);
      return await stayService.getStayById(stayId);
    } catch (e) {
      console.log("patchStay() Error: ", { e });
      throw e;
    }
  }

  @Patch("/{stayId}/publish")
  @Security("user", [Role.Admin])
  public async acceptStay(
    @Request() req: AuthenticatedRequest,
    @Path() stayId: string
  ): Promise<void> {
    try {
      await new StaysService().publishStay(stayId, req.email);
    } catch (e) {
      console.log("publish stay error: ", { e });
      throw e;
    }
  }

  @Patch("/{stayId}/reject")
  @Security("user", [Role.Admin])
  public async rejectStay(
    @Request() req: AuthenticatedRequest,
    @Path() stayId: string,
    @Body() rejectionInfo: StayRejectionInfo
  ): Promise<void> {
    try {
      await new StaysService().rejectStay(stayId, rejectionInfo, req.email);
    } catch (e) {
      console.log("publish stay error: ", { e });
      throw e;
    }
  }

  @Patch("/{stayId}/disable")
  @Security("user", [Role.Host, Role.Admin])
  public async disableStay(
    @Request() req: AuthenticatedRequest,
    @Path() stayId: string
  ): Promise<void> {
    try {
      await new StaysService().disableStay(stayId, req.email);
    } catch (e) {
      console.log("publish stay error: ", { e });
      throw e;
    }
  }

  @Patch("/{stayId}/enable")
  @Security("user", [Role.Host, Role.Admin])
  public async enableStay(
    @Request() req: AuthenticatedRequest,
    @Path() stayId: string
  ): Promise<void> {
    try {
      await new StaysService().enableStay(stayId, req.email);
    } catch (e) {
      console.log("publish stay error: ", { e });
      throw e;
    }
  }

  @Delete("{stayId}")
  @Security("user", [Role.Host, Role.Admin])
  public async deleteStay(@Path() stayId: string): Promise<void> {
    try {
      const stayService = new StaysService();
      const stay: StayRecord = await stayService.getStayById(stayId);
      await new OrgService().removeStayFromOrg(stay.organizationId, stayId);
      await stayService.deleteStay(stayId);
    } catch (e) {
      console.log("deleteStay() Error: " + e);
      throw e;
    }
  }
}
