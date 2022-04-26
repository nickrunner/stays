/* eslint-disable @typescript-eslint/no-explicit-any */
import { Error404 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import {
  Cancellation,
  CancellationRecord,
  GetCancellationsResponse,
  GetOffersResponse,
  OfferRecord,
  StayRecord,
  UserRecord
} from "../models";
import { StaysService } from "../stays/staysService";

export class CancellationService {
  private cancellations: Collection<Cancellation>;

  public constructor() {
    this.cancellations = new Collection<Cancellation>("cancellations");
  }

  public async getCancellations(): Promise<CancellationRecord[]> {
    console.log("cancellationsService: getCancellations()");
    return await this.cancellations.getAll();
  }

  public async getUsersCancellations(user: UserRecord): Promise<GetCancellationsResponse> {
    console.log("cancellationsService: getUsersCancellations()");
    const cancellations: CancellationRecord[] = await this.cancellations.getAll(
      new CollectionQuery().where("stayId").in(user.favorites)
    );
    const stayIds: string[] = cancellations.map((cancellation) => {
      return cancellation.stayId;
    });
    const stays: StayRecord[] = await new StaysService().batchGetStays(stayIds);
    const response: GetCancellationsResponse = cancellations.map((cancellation) => {
      const stay = stays.find((stay) => {
        return stay.id === cancellation.stayId;
      });
      if (!stay) {
        throw new Error404("Stay not found!");
      }
      return {
        cancellation: cancellation,
        stay: stay
      };
    });
    return response;
  }

  public async getStaysCancellations(stayId: string): Promise<CancellationRecord[]> {
    return await this.cancellations.getAll(new CollectionQuery().where("stayId").eq(stayId));
  }

  public async getCancellation(cancellationId: string): Promise<CancellationRecord> {
    return await this.cancellations.get(cancellationId);
  }

  public async cancellationExists(cancellationName: string): Promise<boolean> {
    return await this.cancellations.exists(
      new CollectionQuery().where("name").eq(cancellationName)
    );
  }

  public async createCancellation(cancellation: Cancellation, clientId?: string): Promise<void> {
    await this.cancellations.create(cancellation, clientId);
  }

  public async updateCancellation(
    cancellationId: string,
    attributes: any,
    clientId?: string
  ): Promise<void> {
    await this.cancellations.update(cancellationId, attributes, clientId);
  }

  public async deleteCancellation(cancellationId: string) {
    await this.cancellations.delete(cancellationId);
  }
}
