import { Entity } from "./Entity";

export interface Booking {
    partner: string,
    link: string
};

export type BookingRecord = Entity & Booking; 