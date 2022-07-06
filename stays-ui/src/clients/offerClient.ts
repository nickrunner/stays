import axios from "axios";

import { GetOffersResponse, Offer, OfferRecord } from "../models";
import { defCfg } from "./serverConfig";

export const url = "/offers";

export class OfferClient {
  public async createOffer(offer: Offer) {
    await axios.post(url, offer, await defCfg());
  }

  public async getOffers(): Promise<OfferRecord[]> {
    const response = await axios.get(url, await defCfg());
    return response.data as OfferRecord[];
  }

  public async getOffersFromFavorites(): Promise<GetOffersResponse> {
    const response = await axios.get(url + "/favorites", await defCfg());
    return response.data as GetOffersResponse;
  }
}
