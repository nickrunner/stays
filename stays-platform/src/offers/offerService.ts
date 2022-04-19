/* eslint-disable @typescript-eslint/no-explicit-any */
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { Offer, OfferRecord } from "../models";

export class OfferService {
  private offers: Collection<Offer>;

  public constructor() {
    this.offers = new Collection<Offer>("offers");
  }

  public async getOffers(): Promise<OfferRecord[]> {
    console.log("offersService: getOffers()");
    return await this.offers.getAll();
  }

  public async getOffer(offerId: string): Promise<OfferRecord> {
    return await this.offers.get(offerId);
  }

  public async offerExists(offerName: string): Promise<boolean> {
    return await this.offers.exists(new CollectionQuery().where("name").eq(offerName));
  }

  public async createOffer(offer: Offer, clientId?: string): Promise<void> {
    await this.offers.create(offer, clientId);
  }

  public async updateOffer(offerId: string, attributes: any, clientId?: string): Promise<void> {
    await this.offers.update(offerId, attributes, clientId);
  }

  public async deleteOffer(offerId: string) {
    await this.offers.delete(offerId);
  }
}
