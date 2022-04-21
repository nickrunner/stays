import { Entity } from "./Entity";
import { StayRecord } from "./Stay";
export interface EarlyBooking {
  stayId: string;
  startDate: number;
  endDate: number;
  bookingLink: string;
}
export type EarlyBookingRecord = Entity & EarlyBooking;
export type GetEarlyBookingsResponse = {
  earlyBooking: EarlyBookingRecord;
  stay: StayRecord;
}[];
