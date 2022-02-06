import { Entity } from "./Entity";

export interface Booking {
    partner: string,
    link: string
}

export type SocialRecord = Entity & Booking; 