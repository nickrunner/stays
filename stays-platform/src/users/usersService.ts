/* eslint-disable @typescript-eslint/no-explicit-any */
import { Error404, Error409 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { Role, User, UserMembership, UserRecord, UserSearchFilter } from "../models";

export class UsersService {
  private users: Collection<User>;
  public constructor() {
    this.users = new Collection<User>("users");
  }

  private resolveFilter(filter: UserSearchFilter): CollectionQuery {
    const query = new CollectionQuery()
      .where("firstName")
      .eq(filter.firstName)
      .and("lastName")
      .eq(filter.lastName)
      .and("enabled")
      .eq(filter.enabled)
      .and("email")
      .eq(filter.email)
      .and("userMembership")
      .eq(filter.userMembership)
      .and("roles")
      .arrContainsAny(filter.roles);
    if (filter.lastActive) {
      query.and("lastActive").inRange(filter.lastActive.min, filter.lastActive.max);
    }
    return query;
  }

  public async getUsers(filter?: UserSearchFilter): Promise<UserRecord[]> {
    console.log("getUsers() test ", { filter });
    if (filter) {
      return await this.users.getAll(this.resolveFilter(filter));
    } else {
      return await this.users.getAll();
    }
  }

  public async getUserById(userId: string): Promise<UserRecord> {
    return await this.users.get(userId);
  }

  public async getUserByEmail(email: string): Promise<UserRecord> {
    return await this.users.getFirst(new CollectionQuery().where("email").eq(email));
  }

  public async userExists(userId: string): Promise<boolean> {
    return await this.users.exists(new CollectionQuery().where("id").eq(userId));
  }

  public async createDefaultUser(email: string, clientId?: string): Promise<UserRecord> {
    console.log("Creating default user with email: " + email);
    const user: User = {
      enabled: true,
      firstName: "",
      lastName: "",
      email: email,
      userMembership: UserMembership.Standard,
      lastActive: Date.now(),
      roles: [Role.Stayer],
      favorites: []
    };
    return await this.createUser(user, clientId);
  }

  public async createUser(user: User, clientId?: string): Promise<UserRecord> {
    console.log("Creating User :) " + user.email);
    const userExists: boolean = await this.users.exists(
      new CollectionQuery().where("email").eq(user.email)
    );
    console.log("User exists: " + userExists);
    if (userExists == false) {
      const userRecord: UserRecord = await this.users.create(user, clientId);
      return userRecord;
    } else {
      console.log("UserService", "User already exists!");
      throw new Error409("User with email " + user.email + " already exists");
    }
  }

  public async updateUser(userId: string, attributes: any, clientId?: string): Promise<void> {
    if (await this.userExists(userId)) {
      await this.users.update(userId, attributes, clientId);
    } else {
      console.log("Tried to update user that was no found in DB: " + userId);
      throw new Error404();
    }
  }

  public async updateFirstName(userId: string, firstName: string): Promise<void> {
    await this.users.update(userId, { firstName: firstName });
  }

  public async deleteUser(userId: string) {
    await this.users.delete(userId);
  }

  public async addFavorite(userId: string, stayId: string) {
    await this.users.append(userId, "favorites", [stayId]);
  }

  public async removeFavorite(userId: string, stayId: string) {
    await this.users.arrRemove(userId, "favorites", [stayId]);
  }
}
