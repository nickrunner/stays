import axios from "axios";

import { RegionRecord } from "../models";
import { defCfg } from "./serverConfig";

export const url = "/regions";

export class RegionClient {
  public async getRegions(): Promise<RegionRecord[]> {
    const response = await axios.get(url, await defCfg());
    return response.data as RegionRecord[];
  }
}
