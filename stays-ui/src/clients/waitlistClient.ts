import axios from "axios";

import { WaitlistItem } from "../models";
import { PromotionClient } from "./promotionClient";
import { cfg } from "./serverConfig";

export const url = "/waitlist";
export const WAITLIST_PROMO_NAME = "promo-beta-waitlist";

export class WaitlistClient {
  public async addToWaitlist(
    email: string,
    isStayer: boolean,
    isHost: boolean,
    firstName: string,
    lastName: string,
    promoCode?: string
  ) {
    if (promoCode === "") {
      promoCode = undefined;
    }

    const item: WaitlistItem = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      isStayer: isStayer,
      isHost: isHost,
      promoCode: promoCode
    };
    await axios.post(url, item, cfg());
  }

  public async isPromoCodeValid(promoCode: string): Promise<boolean> {
    const isValid: boolean = await new PromotionClient().isPromoCodeValid(
      WAITLIST_PROMO_NAME,
      promoCode
    );
    return isValid;
  }
}
