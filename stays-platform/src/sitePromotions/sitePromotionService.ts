/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { SitePromotion, SitePromotionRecord } from "../models";

export class SitePromotionService {
  private promotions: Collection<SitePromotion>;

  public constructor() {
    this.promotions = new Collection<SitePromotion>("sitePromotions");
  }

  public async getPromotions(): Promise<SitePromotionRecord[]> {
    console.log("promotionsService: getPromotions()");
    return await this.promotions.getAll();
  }

  public async getPromotion(promotionId: string): Promise<SitePromotionRecord> {
    return await this.promotions.get(promotionId);
  }

  public async getPromotionByName(promotionName: string): Promise<SitePromotion> {
    return await this.promotions.getFirst(new CollectionQuery().where("name").eq(promotionName));
  }

  public async promotionExists(promotionName: string): Promise<boolean> {
    return await this.promotions.exists(new CollectionQuery().where("name").eq(promotionName));
  }

  public async isPromoCodeValid(promoCode: string, promoName: string): Promise<boolean> {
    console.log("promotionService.isPromoCodeValid() called with: " + promoName + ", " + promoCode);
    return await this.promotions.exists(
      new CollectionQuery().where("name").eq(promoName).and("code").eq(promoCode)
    );
  }

  public async createPromotion(promotion: SitePromotion, clientId?: string): Promise<void> {
    await this.promotions.create(promotion, clientId);
  }

  public async updatePromotion(
    promotionId: string,
    attributes: any,
    clientId?: string
  ): Promise<void> {
    await this.promotions.update(promotionId, attributes, clientId);
  }

  public async deletePromotion(promotionId: string) {
    await this.promotions.delete(promotionId);
  }
}
