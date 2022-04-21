import { Entity } from "./Entity";
import { StayRecord } from "./Stay";
export interface Offer {
  stayId: string;
  title: string;
  description: string;
}
export type OfferRecord = Entity & Offer;

export type GetOffersResponse = {
  offer: OfferRecord;
  stay: StayRecord;
}[];
