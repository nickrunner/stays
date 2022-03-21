import { Body, Controller, Get, Path, Post, Query, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../../auth/auth";
import { Error401, Error409 } from "../../error";
import { Role, StayAttribute, StayAttributeRecord, StayAttributeType } from "../../models";
import { StaysService } from "../staysService";
import { StayAttributesService } from "./stayAttributesService";

@Route("stays/attributes")
export class StayAttributesController extends Controller {
  @Get("{type}")
  public async getStayAttributes(@Path() type: StayAttributeType): Promise<StayAttributeRecord[]> {
    try {
      const service: StayAttributesService = new StayAttributesService();
      return await service.getStayAttributes(type);
    } catch (e) {
      console.log("error getting stay attributes");
      throw e;
    }
  }

  @Get("/zips/available")
  public async getAvailableZips(@Query() states: string): Promise<number[]> {
    const parsedStates: string[] = states?.split(",");
    try {
      return await new StaysService().getAvailableZips(parsedStates);
    } catch (e) {
      console.log("Error getting available zips for states: " + states);
      throw e;
    }
  }

  @Get("/cities/available")
  public async getAvailableCities(@Query() states: string): Promise<string[]> {
    console.log("Getting available cities for: " + states);
    const parsedStates: string[] = JSON.parse(states);
    try {
      return await new StaysService().getAvailableCities(parsedStates);
    } catch (e) {
      console.log("Error getting available cites for states: " + states);
      throw e;
    }
  }

  @Get("/states/available")
  public async getAvailableStates(@Query() regions: string): Promise<string[]> {
    console.log("Getting available states for: " + regions);
    const parsedStates: string[] = JSON.parse(regions);
    try {
      return await new StaysService().getAvailableCities(parsedStates);
    } catch (e) {
      console.log("Error getting available states for regions: " + regions);
      throw e;
    }
  }

  @Post("{type}")
  @Security("user", [Role.Admin])
  public async addStayAttribute(
    @Request() req: AuthenticatedRequest,
    @Body() attribute: StayAttribute,
    @Path() type: StayAttributeType
  ): Promise<void> {
    try {
      if (type != attribute.type) {
        throw new Error409();
      }
      const service: StayAttributesService = new StayAttributesService();
      if (req.email) {
        await service.createStayAttribute(attribute, req.email);
      } else {
        throw new Error401();
      }
    } catch (e) {
      console.log("error getting stay attributes");
      throw e;
    }
  }
}
