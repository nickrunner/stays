/* eslint-disable @typescript-eslint/no-explicit-any */

import { Error404 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { GetOffersResponse, Offer, OfferRecord, StayRecord, UserRecord } from "../models";
import { StaysService } from "../stays/staysService";

export class OfferService {
  private offers: Collection<Offer>;

  public constructor() {
    this.offers = new Collection<Offer>("offers");
  }

  public async getOffers(): Promise<OfferRecord[]> {
    return await this.offers.getAll();
  }

  public async getUsersOffers(user: UserRecord): Promise<GetOffersResponse> {
    console.log("offersService: getOffers()");
    const offers: OfferRecord[] = await this.offers.getAll(
      new CollectionQuery().where("stayId").in(user.favorites)
    );
    const stayIds: string[] = offers.map((offer) => {
      return offer.stayId;
    });
    const stays: StayRecord[] = await new StaysService().batchGetStays(stayIds);
    const response: GetOffersResponse = offers.map((offer) => {
      const stay = stays.find((stay) => {
        return stay.id === offer.stayId;
      });
      if (!stay) {
        throw new Error404("Stay not found!");
      }
      return {
        offer: offer,
        stay: stay
      };
    });
    return response;
  }

  public async getStayOffers(stayId: string): Promise<OfferRecord[]> {
    return await this.offers.getAll(new CollectionQuery().where("stayId").eq(stayId));
  }

  public async getOffer(offerId: string): Promise<OfferRecord> {
    return await this.offers.get(offerId);
  }

  public async offerExists(offerName: string): Promise<boolean> {
    return await this.offers.exists(new CollectionQuery().where("name").eq(offerName));
  }

  public async createOffer(offer: Offer, clientId?: string): Promise<OfferRecord> {
    return await this.offers.create(offer, clientId);
  }

  public async updateOffer(offerId: string, attributes: any, clientId?: string): Promise<void> {
    await this.offers.update(offerId, attributes, clientId);
  }

  public async deleteOffer(offerId: string) {
    await this.offers.delete(offerId);
  }
}
