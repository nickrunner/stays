import { Entity } from "./Entity";
import { StayRecord } from "./Stay";
export interface Cancellation {
  stayId: string;
  startDate: number;
  endDate: number;
}
export type CancellationRecord = Entity & Cancellation;

export type GetCancellationsResponse = {
  cancellation: CancellationRecord;
  stay: StayRecord;
}[];
