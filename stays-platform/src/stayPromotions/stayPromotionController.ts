import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Role, StayPromotion, StayPromotionRecord } from "../models";
import { StayPromotionService } from "./stayPromotionService";

@Route("stay-promotions")
export class StayPromotionController extends Controller {
  @Get()
  public async getStayPromotions(): Promise<StayPromotionRecord[]> {
    return await new StayPromotionService().getPromotions();
  }

  @Post()
  @Security("user", [Role.Host])
  public async createStayPromotion(
    @Request() req: AuthenticatedRequest,
    @Body() promotion: StayPromotion
  ): Promise<void> {
    return await new StayPromotionService().createPromotion(promotion, req.email);
  }
}
