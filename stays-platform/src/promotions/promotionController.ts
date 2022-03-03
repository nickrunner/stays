import { json } from "body-parser";
import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    Query,
    Patch,
    Delete,
    Security,
    Request
  } from "tsoa";

import { Promotion, PromotionRecord } from "../../../common/models/Promotion";
import { Role } from "../../../common/models/user";
import { AuthenticatedRequest } from "../auth/auth";
import { PromotionService } from "./promotionService";

@Route("promotions")
export class PromotionsController extends Controller {

    @Get()
    public async getPromotions(): Promise<PromotionRecord[]>{
        return await new PromotionService().getPromotions();
    }

    @Get("{promotionId}")
    public async getPromotionById(
        @Path() promotionId: string,
    ): Promise<PromotionRecord> {
        return await new PromotionService().getPromotion(promotionId);
    }

    @Post()
    @Security("user", [Role.Admin])
    public async createPromotion(
        @Request() req: AuthenticatedRequest,
        @Body() promotion: Promotion
    ): Promise<void>
    {
        return await new PromotionService().createPromotion(promotion, req.email);
    }

    @Get("{promoName}/{promoCode}/validate")
    public async isCodeValid(
        @Path() promoName: string,
        @Path() promoCode: string
    ): Promise<boolean> {
        console.log("promotionController.isCodeValid() called with "+promoName+", "+promoCode);
        try{
            const isValid = await new PromotionService().isPromoCodeValid(promoCode, promoName);
            console.log("promotionService().isPromoCodeValid() = "+isValid);
            return isValid;
        }
        catch(err){
            console.log("Failed validating promo code; "+JSON.stringify(err, null ,2));
            throw err;
        }
        
    }
}