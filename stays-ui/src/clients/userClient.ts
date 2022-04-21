import axios from "axios";

import {
  GetOffersResponse,
  OrgRecord,
  Role,
  User,
  UserMembership,
  UserRecord,
  UserSearchFilter
} from "../models";
import { defCfg, queryCfg } from "./serverConfig";

export const url = "/users";

export class UserClient {
  public async createUser(email: string, firstName: string, lastName: string): Promise<User> {
    const user: User = {
      enabled: true,
      firstName: firstName,
      lastName: lastName,
      email: email,
      userMembership: UserMembership.Standard,
      lastActive: Date.now(),
      roles: [Role.Stayer],
      favorites: []
    };
    const response = await axios.post(url, user, await defCfg());
    return response.data as User;
  }

  public async getSelf(): Promise<UserRecord> {
    const response = await axios.get(url + "/self", await defCfg());
    const user = response.data as UserRecord;
    console.log("Received user: " + user.email);
    return response.data as UserRecord;
  }

  public async getUserByEmail(email: string): Promise<User> {
    const filter: UserSearchFilter = {
      email: email
    };
    const response = await axios.get(url, await queryCfg({ filter: filter }));
    return response.data as User;
  }

  public async getUserById(userId: string): Promise<UserRecord> {
    const response = await axios.get(url, await queryCfg({ id: userId }));
    return response.data as UserRecord;
  }

  public async getUsers(filters: any): Promise<UserRecord[]> {
    const response = await axios.get(url, await queryCfg(filters));
    return response.data as UserRecord[];
  }

  public async addFavorite(stayId: string): Promise<void> {
    const cfg = await defCfg();
    await axios.post(url + "/self/favorites/" + stayId, +stayId, cfg);
  }

  public async removeFavorite(stayId: string): Promise<void> {
    await axios.delete(url + "/self/favorites/" + stayId, await defCfg());
  }

  public async getUserOrgs(): Promise<OrgRecord[]> {
    const response = await axios.get(url + "/self/orgs", await defCfg());
    return response.data as OrgRecord[];
  }
}
