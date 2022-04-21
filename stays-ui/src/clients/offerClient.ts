import axios from "axios";

import { GetOffersResponse, Offer, OfferRecord } from "../models";
import { cfg, defCfg } from "./serverConfig";

export const url = "/offers";

export class OfferClient {
  public async createOffer(offer: Offer) {
    await axios.post(url, { offer: offer }, await defCfg());
  }

  public async getOffers(): Promise<GetOffersResponse> {
    const response = await axios.get(url, await defCfg());
    return response.data as GetOffersResponse;
  }
}
