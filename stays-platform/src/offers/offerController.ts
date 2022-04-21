import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Error401 } from "../error";
import { GetOffersResponse, Offer, OfferRecord, Role } from "../models";
import { OfferService } from "./offerService";

@Route("offers")
export class OfferController extends Controller {
  @Get()
  @Security("user", [Role.Stayer])
  public async getAllOffers(): Promise<OfferRecord[]> {
    try {
      const offersResponse = await new OfferService().getOffers();
      return offersResponse;
    } catch (err) {
      console.log("Failed getting offers");
      throw err;
    }
  }

  @Post()
  @Security("user", [Role.Host])
  public async createOffer(
    @Request() req: AuthenticatedRequest,
    @Body() offer: Offer
  ): Promise<OfferRecord> {
    return await new OfferService().createOffer(offer, req.email);
  }
}
