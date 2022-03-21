import { Controller, Get, Route } from "tsoa";

import { RegionRecord } from "../models";
import { RegionsService } from "./regionsService";

@Route("regions")
export class RegionsController extends Controller {
  @Get()
  public async getRegions(): Promise<RegionRecord[]> {
    try {
      return await new RegionsService().getRegions();
    } catch (e) {
      console.log("Failed getting regions: " + e);
      throw e;
    }
  }
}
