/* eslint-disable @typescript-eslint/no-explicit-any */
import { isEqual, merge } from "lodash";
import ow from "ow";

import { Coordinates } from "../../../common/models/Location";
import { Pagination } from "../../../common/models/Pagination";
import {
  Stay,
  StayApplicationStatus,
  StayRecord,
  StayRejectionInfo,
  StaySearchFilter
} from "../../../common/models/stay";
import { Error400, Error409 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import LocationService from "../locationService";

export class StaysService {
  private stays: Collection<Stay>;

  public constructor() {
    this.stays = new Collection<Stay>("stays");
  }

  private buildQuery(search: string, filter: StaySearchFilter): CollectionQuery {
    const query = new CollectionQuery()
      .where("name")
      .eq(filter.name)
      .and("enable")
      .eq(filter.enable)
      .and("city")
      .eq(filter.city)
      .and("state")
      .eq(filter.state)
      .and("zip")
      .eq(filter.zip)
      .and("petsAllowed")
      .eq(filter.petsAllowed)
      .and("onSiteParking")
      .eq(filter.onSiteParking)
      .and("status")
      .eq(filter.status)
      .and("type")
      .arrContainsAny(filter.type)
      .and("perks")
      .arrContainsAny(filter.specialInterests)
      .and("amenities")
      .arrContainsAny(filter.amenities)
      .and("tags")
      .arrContainsAny(filter.tags);
    if (filter.bounds) {
      query
        .and("location.coordinates.latitude")
        .inRange(filter.bounds.sw.latitude, filter.bounds.ne.latitude);
      query
        .and("location.coordinates.longitude")
        .inRange(filter.bounds.sw.longitude, filter.bounds.ne.longitude);
    }
    if (filter.rate) {
      query.and("currentRate").inRange(filter.rate.min, filter.rate.max);
    }
    if (filter.capacity) {
      query.and("capacity").inRange(filter.capacity.min, filter.capacity.max);
    }
    if (filter.bedrooms) {
      query.and("bedrooms").inRange(filter.bedrooms.min, filter.bedrooms.max);
    }
    const keywords = this.getKeywordsFromString(search);
    if (keywords.length > 0) {
      query.and("tags").arrContainsAny(keywords);
    }

    return query;
  }

  public async getStays(
    search: string,
    filter: StaySearchFilter,
    pagination?: Pagination
  ): Promise<StayRecord[]> {
    console.log("getStays() search: " + search + " filter: " + JSON.stringify(filter, null, 2));
    const query = this.buildQuery(search, filter);
    if (pagination) {
      return await this.stays.getSome(query, pagination);
    } else {
      return await this.stays.getAll(this.buildQuery(search, filter));
    }
  }

  public async getStayById(stayId: string): Promise<StayRecord> {
    return await this.stays.get(stayId);
  }

  public async stayExists(stayId: string): Promise<boolean> {
    return await this.stays.exists(new CollectionQuery().where("id").eq(stayId));
  }

  public async publishStay(stayId: string, clientId?: string): Promise<void> {
    console.log("Publishing Stay ", { stayId });
    const stay = await this.stays.get(stayId);
    await this.validateStay(stay);
    await this.stays.update(stayId, { status: StayApplicationStatus.Accepted }, clientId);
  }

  public async rejectStay(
    stayId: string,
    rejectionInfo: StayRejectionInfo,
    clientId?: string
  ): Promise<void> {
    console.log("Rejecting stay: " + stayId, { rejectionInfo });
    await this.stays.update(stayId, { status: StayApplicationStatus.Rejected }, clientId);
  }

  public async disableStay(stayId: string, clientId?: string): Promise<void> {
    console.log("Disabling stay: " + stayId);
    await this.stays.update(stayId, { enabled: false }, clientId);
  }

  public async enableStay(stayId: string, clientId?: string): Promise<void> {
    console.log("Enabling stay: " + stayId);
    await this.stays.update(stayId, { enabled: true }, clientId);
  }

  public async createApplication(stay: Stay): Promise<StayRecord> {
    console.log("Creating stay application: ", { stay });
    stay.status = StayApplicationStatus.Pending;
    return await this.stays.create(stay);
  }

  public async createStay(stay: Stay): Promise<StayRecord> {
    console.log("Creating stay: ", { stay });
    if (await this.stays.exists(new CollectionQuery().where("name").eq(stay.name))) {
      throw new Error409("Stay with this name already exists");
    }
    await this.validateStay(stay);
    stay.tags = this.generateKeywords(stay);
    return await this.stays.create(stay);
  }

  public async getStayByName(name: string): Promise<StayRecord> {
    return await this.stays.getFirst(new CollectionQuery().where("name").eq(name));
  }

  public async createOrUpdateStay(stay: Stay): Promise<void> {
    console.log("Create or update stay");
    if (await this.stays.exists(new CollectionQuery().where("name").eq(stay.name))) {
      const currStay = await this.getStayByName(stay.name);
      await this.updateStay(currStay.id, stay);
    } else {
      await this.createStay(stay);
    }
  }

  public async createStays(stays: Stay[]): Promise<void> {
    for (const stay of stays) {
      await this.validateStay(stay);
      if (await this.stays.exists(new CollectionQuery().where("name").eq(stay.name))) {
        throw new Error409("Stay with this name already exists");
      }
      stay.tags = this.generateKeywords(stay);
    }
    return await this.stays.batchCreate(stays);
  }

  public async updateStay(stayId: string, attributes: any): Promise<void> {
    const oldStay: Stay = (await this.stays.get(stayId)) as Stay;
    const newStay = merge(oldStay, attributes);
    // If location has changed we need to re-geocode
    if (!isEqual(newStay.location.address, oldStay.location.address)) {
      console.log(
        "Re-Geocoding " +
          JSON.stringify(newStay.location, null, 2) +
          " old: " +
          JSON.stringify(oldStay.location, null, 2)
      );
      newStay.location.coordinates = await new LocationService().getCoordinates(
        oldStay.location.address
      );
    }
    newStay.tags = this.generateKeywords(newStay);
    console.log("Updating stay: " + JSON.stringify(newStay, null, 2));
    await this.validateStay(newStay);
    await this.stays.update(stayId, newStay);
  }

  public async deleteStay(stayId: string) {
    await this.stays.delete(stayId);
  }

  private getKeywordsFromString(description: string): string[] {
    let keywords: string[] = [];
    keywords = keywords.concat(
      description
        .split(" ")
        .map((word) => {
          word = word.replace(/[^a-z0-9]/gi, "");
          return word.toLowerCase();
        })
        .filter((word) => {
          return word.length > 3;
        })
    );
    return keywords;
  }

  private generateKeywords(stay: Stay): string[] {
    try {
      ow(stay.tags, ow.array);
    } catch {
      stay.tags = [];
    }
    let keywords: string[] = [];
    keywords = keywords.concat(this.getKeywordsFromString(stay.description));
    try {
      keywords.push(stay.location.address.city);
      keywords.push(stay.location.address.country);
      keywords.push(stay.location.address.state);
      keywords.push(stay.location.address.zip.toString());
      keywords.push(stay.location.region);
    } catch (err) {
      console.log("Failed pushing location keywords");
    }

    if (stay.petsAllowed) {
      keywords = keywords.concat([
        "pet",
        "pets",
        "dog",
        "dogs",
        "cat",
        "cats",
        "animal",
        "animals"
      ]);
    }
    if (stay.onSiteParking) {
      keywords = keywords.concat(["parking", "park"]);
    }
    for (const propertyType of stay.type) {
      keywords.push(propertyType.toLowerCase());
    }
    for (const amenity of stay.amenities) {
      keywords.push(amenity.toLowerCase());
    }
    for (const specialInterest of stay.specialInterests) {
      keywords.push(specialInterest.toLowerCase());
    }
    for (const photo of stay.photos) {
      keywords = keywords.concat(this.getKeywordsFromString(photo.description));
    }
    for (const social of stay.social) {
      keywords.push(social.partner.toLowerCase());
    }
    for (const booking of stay.booking) {
      keywords.push(booking.partner.toLowerCase());
    }
    keywords = keywords.filter((word) => {
      return word;
    });
    return keywords;
  }

  private async validateStay(stay: Stay) {
    console.log("Validating stay");

    ow(stay.location, ow.object.nonEmpty);
    try {
      ow(stay.location.coordinates, ow.object.nonEmpty);
    } catch (err) {
      console.log("Coordinates not present... running geocoder");
      const coordinates: Coordinates = await new LocationService().getCoordinates(
        stay.location.address
      );
      stay.location.coordinates = coordinates;
    }

    try {
      stay.currentRate = Number(stay.currentRate);
      stay.capacity = Number(stay.capacity);
      stay.bedrooms = Number(stay.bedrooms);
      if (stay.averageRate) {
        stay.averageRate = Number(stay.averageRate);
      }

      ow(
        stay,
        ow.object.partialShape({
          name: ow.string.nonEmpty,
          enable: ow.boolean,
          description: ow.string.nonEmpty,
          location: {
            address: {
              city: ow.string.nonEmpty,
              state: ow.string.nonEmpty
            },
            coordinates: ow.object.nonEmpty,
            region: ow.string.nonEmpty
          },
          type: ow.array.nonEmpty,
          specialInterests: ow.array,
          amenities: ow.array,
          photos: ow.array.nonEmpty,
          status: ow.string.nonEmpty,
          petsAllowed: ow.boolean,
          onSiteParking: ow.boolean,
          tags: ow.array,
          social: ow.array,
          booking: ow.array.nonEmpty
        })
      );
    } catch (e) {
      console.log("Failed stay validation: ", { e });
      throw new Error400();
    }
  }
}
