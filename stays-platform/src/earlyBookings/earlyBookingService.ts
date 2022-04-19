/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { EarlyBooking, EarlyBookingRecord } from "../models";

export class EarlyBookingService {
  private earlyBookings: Collection<EarlyBooking>;

  public constructor() {
    this.earlyBookings = new Collection<EarlyBooking>("earlyBookings");
  }

  public async getEarlyBookings(): Promise<EarlyBookingRecord[]> {
    console.log("earlyBookingsService: getEarlyBookings()");
    return await this.earlyBookings.getAll();
  }

  public async getEarlyBooking(earlyBookingId: string): Promise<EarlyBookingRecord> {
    return await this.earlyBookings.get(earlyBookingId);
  }

  public async earlyBookingExists(earlyBookingName: string): Promise<boolean> {
    return await this.earlyBookings.exists(
      new CollectionQuery().where("name").eq(earlyBookingName)
    );
  }

  public async createEarlyBooking(earlyBooking: EarlyBooking, clientId?: string): Promise<void> {
    await this.earlyBookings.create(earlyBooking, clientId);
  }

  public async updateEarlyBooking(
    earlyBookingId: string,
    attributes: any,
    clientId?: string
  ): Promise<void> {
    await this.earlyBookings.update(earlyBookingId, attributes, clientId);
  }

  public async deleteEarlyBooking(earlyBookingId: string) {
    await this.earlyBookings.delete(earlyBookingId);
  }
}
