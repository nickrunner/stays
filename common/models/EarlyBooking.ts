import { Entity } from "./Entity";
export interface EarlyBooking {
  stayId: string;
  startDate: number;
  endDate: number;
  bookingLink: string;
}
export type EarlyBookingRecord = Entity & EarlyBooking;
