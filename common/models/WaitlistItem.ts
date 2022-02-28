import { Entity } from "./Entity";

export interface WaitlistItem {
    email: string,
    firstName: string,
    lastName: string,
    isStayer: boolean,
    isHost: boolean,
    promoCode?: string
};

export type WaitlistItemRecord = Entity & WaitlistItem;