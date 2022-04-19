import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Offer, OfferRecord, Role } from "../models";
import { OfferService } from "./offerService";

@Route("offers")
export class OfferController extends Controller {
  @Get()
  public async getOffers(): Promise<OfferRecord[]> {
    return await new OfferService().getOffers();
  }
  @Post()
  @Security("user", [Role.Host, Role.Admin])
  public async createOffer(
    @Request() req: AuthenticatedRequest,
    @Body() promotion: Offer
  ): Promise<void> {
    return await new OfferService().createOffer(promotion, req.email);
  }
}
