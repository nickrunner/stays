/* eslint-disable @typescript-eslint/no-explicit-any */
import { Error404 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import {
  EarlyBooking,
  EarlyBookingRecord,
  GetEarlyBookingsResponse,
  StayRecord,
  UserRecord
} from "../models";
import { StaysService } from "../stays/staysService";

export class EarlyBookingService {
  private earlyBookings: Collection<EarlyBooking>;

  public constructor() {
    this.earlyBookings = new Collection<EarlyBooking>("earlyBookings");
  }

  public async getEarlyBookings(): Promise<EarlyBookingRecord[]> {
    console.log("earlyBookingsService: getEarlyBookings()");
    return await this.earlyBookings.getAll();
  }

  public async getUsersEarlyBookings(user: UserRecord): Promise<GetEarlyBookingsResponse> {
    console.log("offersService: getOffers()");
    const earlyBookings: EarlyBookingRecord[] = await this.earlyBookings.getAll(
      new CollectionQuery().where("stayId").in(user.favorites)
    );
    const stayIds: string[] = earlyBookings.map((earlyBooking) => {
      return earlyBooking.stayId;
    });
    const stays: StayRecord[] = await new StaysService().batchGetStays(stayIds);
    const response: GetEarlyBookingsResponse = earlyBookings.map((earlyBooking) => {
      const stay = stays.find((stay) => {
        return stay.id === earlyBooking.stayId;
      });
      if (!stay) {
        throw new Error404("Stay not found!");
      }
      return {
        earlyBooking: earlyBooking,
        stay: stay
      };
    });
    return response;
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
