import _ from "lodash";
import ow from "ow";

import { Error400 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { State, StateRecord } from "../models";

export class StatesService {
  private states: Collection<State>;

  public constructor() {
    this.states = new Collection<State>("states");
  }

  public validateState(state: State) {
    try {
      ow(
        state,
        ow.object.partialShape({
          name: ow.string.nonEmpty
        })
      );
    } catch (e) {
      console.log("Failed state validation: ", { e });
      throw new Error400();
    }
  }

  public async getStates(): Promise<StateRecord[]> {
    return await this.states.getAll();
  }

  public async listStates(): Promise<string[]> {
    const states = await this.states.getAll();
    return states.map((state) => {
      return state.name;
    });
  }

  public async getStateByName(name: string): Promise<StateRecord> {
    return await this.states.getFirst(new CollectionQuery().where("name").eq(name));
  }

  public async createState(state: State): Promise<StateRecord> {
    this.validateState(state);
    return await this.states.create(state);
  }

  public async updateState(id: string, state: State) {
    this.validateState(state);
    return await this.states.update(id, state);
  }

  public async createOrUpdateState(state: State): Promise<void> {
    this.validateState(state);
    const query: CollectionQuery = new CollectionQuery().where("name").eq(state.name);
    if (!(await this.states.exists(query))) {
      await this.states.create(state);
    }
  }

  public async listCitiesFromStates(stateNames: string[]): Promise<string[]> {
    const states: StateRecord[] = await this.states.getAll(
      new CollectionQuery().where("name").in(stateNames)
    );
    let cities: string[] = [];
    for (const state of states) {
      if (state.cities) {
        cities = cities.concat(state.cities);
      }
    }
    return _.orderBy(cities, [], ["asc"]);
  }

  public async addCity(stateName: string, city: string): Promise<void> {
    const stateRecord: StateRecord = await this.getStateByName(stateName);
    await this.states.append(stateRecord.id, "cities", [city]);
  }

  public async addCities(stateName: string, cities: string[]): Promise<void> {
    const stateRecord: StateRecord = await this.getStateByName(stateName);
    await this.states.append(stateRecord.id, "cities", cities);
  }
}
