import { Controller, Get, Path, Query, Route } from "tsoa";

import { StateRecord } from "../models";
import { RegionsService } from "./regionsService";
import { StatesService } from "./statesService";

@Route("states")
export class StatesController extends Controller {
  @Get()
  public async getStates(): Promise<StateRecord[]> {
    try {
      return await new StatesService().getStates();
    } catch (e) {
      console.log("Failed getting states: " + e);
      throw e;
    }
  }

  @Get("/list")
  public async listStates(@Query() regions?: string): Promise<string[]> {
    console.log("Listing states with regions: " + regions);
    try {
      if (regions) {
        const parsedRegions = JSON.parse(regions);
        return await new RegionsService().listStatesFromRegions(parsedRegions);
      } else {
        return await new StatesService().listStates();
      }
    } catch (e) {
      console.log("Failed listing states: " + e);
      throw e;
    }
  }

  @Get("/cities")
  public async getCities(@Query() states: string): Promise<string[]> {
    try {
      const parsedStates = JSON.parse(states);
      return await new StatesService().listCitiesFromStates(parsedStates);
    } catch (e) {
      console.log("Failed listing states: " + e);
      throw e;
    }
  }
}
