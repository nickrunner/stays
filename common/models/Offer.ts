import { Entity } from "./Entity";
export interface Offer {
  stayId: string;
  title: string;
  description: string;
}
export type OfferRecord = Entity & Offer;
