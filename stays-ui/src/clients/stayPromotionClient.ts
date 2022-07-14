import axios from "axios";

import { StayPromotion, StayPromotionRecord } from "../models";
import { cfg, defCfg } from "./serverConfig";

export const url = "/stay-promotions";

export class StayPromotionClient {
  public async addStayPromotion(stayPromotion: StayPromotion): Promise<StayPromotionRecord> {
    const response = await axios.post(url, stayPromotion, await defCfg());
    return response.data as StayPromotionRecord;
  }

  public async getStayPromotions(): Promise<StayPromotionRecord[]> {
    const response = await axios.get(url, await defCfg());
    return response.data as StayPromotionRecord[];
  }
}
