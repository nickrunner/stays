import { Entity } from "./Entity";
export interface Cancellation {
  stayId: string;
  startDate: number;
  endDate: number;
}
export type CancellationRecord = Entity & Cancellation;
