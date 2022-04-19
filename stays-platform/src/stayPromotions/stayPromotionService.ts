/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { StayPromotion, StayPromotionRecord } from "../models";

export class StayPromotionService {
  private promotions: Collection<StayPromotion>;

  public constructor() {
    this.promotions = new Collection<StayPromotion>("stayPromotions");
  }

  public async getPromotions(): Promise<StayPromotionRecord[]> {
    console.log("promotionsService: getPromotions()");
    return await this.promotions.getAll();
  }

  public async getPromotion(promotionId: string): Promise<StayPromotionRecord> {
    return await this.promotions.get(promotionId);
  }

  public async getPromotionByName(promotionName: string): Promise<StayPromotion> {
    return await this.promotions.getFirst(new CollectionQuery().where("name").eq(promotionName));
  }

  public async promotionExists(promotionName: string): Promise<boolean> {
    return await this.promotions.exists(new CollectionQuery().where("name").eq(promotionName));
  }

  public async createPromotion(promotion: StayPromotion, clientId?: string): Promise<void> {
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
