import { Entity } from "./Entity";

export interface WaitlistItem {
  email: string;
  name: string;
  continent: string;
  isStayer: boolean;
  isHost: boolean;
  promoCode?: string;
}

export type WaitlistItemRecord = Entity & WaitlistItem;
