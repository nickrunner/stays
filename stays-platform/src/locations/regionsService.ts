import _ from "lodash";
import ow from "ow";

import { Error400 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { Region, RegionRecord } from "../models";

export class RegionsService {
  private regions: Collection<Region>;

  public constructor() {
    this.regions = new Collection<Region>("regions");
  }

  public validateRegion(region: Region) {
    try {
      ow(
        region,
        ow.object.partialShape({
          name: ow.string.nonEmpty
        })
      );
    } catch (e) {
      console.log("Failed region validation: ", { e });
      throw new Error400();
    }
  }

  public async getRegions(): Promise<RegionRecord[]> {
    return await this.regions.getAll();
  }

  public async createRegion(region: Region): Promise<RegionRecord> {
    this.validateRegion(region);
    return await this.regions.create(region);
  }

  public async updateRegion(id: string, region: Region) {
    this.validateRegion(region);
    return await this.regions.update(id, region);
  }

  public async createOrUpdateRegion(region: Region): Promise<void> {
    this.validateRegion(region);
    const query: CollectionQuery = new CollectionQuery().where("name").eq(region.name);
    if (!(await this.regions.exists(query))) {
      await this.regions.create(region);
    }
  }

  public async listStatesFromRegions(regionNames: string[]): Promise<string[]> {
    const regions: RegionRecord[] = await this.regions.getAll(
      new CollectionQuery().where("name").in(regionNames)
    );
    let states: string[] = [];
    for (const region of regions) {
      if (region.states) {
        states = states.concat(region.states);
      }
    }
    return _.orderBy(states, [], "asc");
  }

  public async addStateToRegion(regionName: string, state: string): Promise<void> {
    console.log("Adding " + state + " to " + regionName);
    const regionRecord = await this.regions.getFirst(
      new CollectionQuery().where("name").eq(regionName)
    );
    console.log("preparing to append");
    await this.regions.append(regionRecord.id, "states", [state]);
  }

  public async addStatesToRegion(regionName: string, states: string[]): Promise<void> {
    const regionRecord = await this.regions.getFirst(
      new CollectionQuery().where("name").eq(regionName)
    );
    await this.regions.append(regionRecord.id, "states", states);
  }
}
