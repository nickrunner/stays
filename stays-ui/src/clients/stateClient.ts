import axios from "axios";

import { StateRecord } from "../models";
import { cfg, queryCfg } from "./serverConfig";

export const url = "/states";

export class StateClient {
  public async getStates(): Promise<StateRecord[]> {
    const response = await axios.get(url, cfg());
    return response.data as StateRecord[];
  }

  public async listStates(regions?: string[]): Promise<string[]> {
    if (regions && regions.length == 0) {
      regions = undefined;
    }
    const response = await axios.get(
      url + "/list",
      await queryCfg({ regions: JSON.stringify(regions) }, true)
    );
    return response.data as string[];
  }

  public async listCitiesFromStates(states: string[]) {
    if (states.length < 1) {
      return [];
    }
    const response = await axios.get(
      url + "/cities",
      await queryCfg({ states: JSON.stringify(states) }, true)
    );
    return response.data as string[];
  }
}
