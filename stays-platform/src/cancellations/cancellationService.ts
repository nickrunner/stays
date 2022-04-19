/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { Cancellation, CancellationRecord } from "../models";

export class CancellationService {
  private cancellations: Collection<Cancellation>;

  public constructor() {
    this.cancellations = new Collection<Cancellation>("cancellations");
  }

  public async getCancellations(): Promise<CancellationRecord[]> {
    console.log("cancellationsService: getCancellations()");
    return await this.cancellations.getAll();
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
