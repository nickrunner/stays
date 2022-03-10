import axios from "axios";

import { PromotionRecord } from "../../../common/models/Promotion";
import { cfg, defCfg } from "./serverConfig";

export const url = "/promotions";

export class PromotionClient {
  public async isPromoCodeValid(name: string, promoCode: string): Promise<boolean> {
    const isValid: boolean = await (
      await axios.get(url + "/" + name + "/" + promoCode + "/validate", cfg())
    ).data;
    console.log("Promo Code: " + promoCode + " is valid? " + isValid);
    return isValid;
  }

  public async addPromotion(code: string, name: string) {
    await axios.post(url, { code: code, name: name }, await defCfg());
  }

  public async getPromotions(): Promise<PromotionRecord[]> {
    return await axios.get(url, await defCfg());
  }
}
