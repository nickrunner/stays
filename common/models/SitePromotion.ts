import { Entity } from "./Entity";

export interface SitePromotion {
  code: string;
  name: string;
}

export type SitePromotionRecord = Entity & SitePromotion;
