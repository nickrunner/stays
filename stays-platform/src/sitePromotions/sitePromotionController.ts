import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Role, SitePromotion, SitePromotionRecord } from "../models";
import { SitePromotionService } from "./sitePromotionService";

@Route("site-promotions")
export class SitePromotionsController extends Controller {
  @Get()
  public async getPromotions(): Promise<SitePromotionRecord[]> {
    return await new SitePromotionService().getPromotions();
  }

  @Get("{promotionId}")
  public async getPromotionById(@Path() promotionId: string): Promise<SitePromotionRecord> {
    return await new SitePromotionService().getPromotion(promotionId);
  }

  @Post()
  @Security("user", [Role.Admin])
  public async createPromotion(
    @Request() req: AuthenticatedRequest,
    @Body() promotion: SitePromotion
  ): Promise<void> {
    return await new SitePromotionService().createPromotion(promotion, req.email);
  }

  @Get("{promoName}/{promoCode}/validate")
  public async isCodeValid(@Path() promoName: string, @Path() promoCode: string): Promise<boolean> {
    console.log("promotionController.isCodeValid() called with " + promoName + ", " + promoCode);
    try {
      const isValid = await new SitePromotionService().isPromoCodeValid(promoCode, promoName);
      console.log("promotionService().isPromoCodeValid() = " + isValid);
      return isValid;
    } catch (err) {
      console.log("Failed validating promo code; " + JSON.stringify(err, null, 2));
      throw err;
    }
  }
}
