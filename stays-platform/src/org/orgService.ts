import { Error400 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { Org, OrgRecord, StayRecord, UserRecord } from "../models";
import { StaysService } from "../stays/staysService";
import { UsersService } from "../users/usersService";

export class OrgService {
  private orgs: Collection<Org>;

  public constructor() {
    this.orgs = new Collection<Org>("hostOrganizations");
  }

  public async getOrgs(): Promise<OrgRecord[]> {
    return await this.orgs.getAll();
  }

  public async getOrgById(orgId: string): Promise<OrgRecord> {
    return await this.orgs.get(orgId);
  }

  public async getOrgByName(orgName: string): Promise<OrgRecord> {
    return await this.orgs.getFirst(new CollectionQuery().where("name").eq(orgName));
  }

  public async getUsersOrgs(user: UserRecord): Promise<OrgRecord[]> {
    return await this.orgs.getAll(new CollectionQuery().where("userIds").arrContains(user.id));
  }

  public async createOrg(org: Org): Promise<OrgRecord> {
    return await this.orgs.create(org);
  }

  public async updateOrg(orgId: string, org: Org) {
    return await this.orgs.update(orgId, org);
  }

  public async updateOrgName(orgId: string, name: string): Promise<void> {
    return await this.orgs.update(orgId, { name: name });
  }

  public async addStayToOrg(orgId: string, stayId: string): Promise<void> {
    //Validate stay exists
    const stayExists = await new StaysService().stayExists(stayId);
    if (!stayExists) {
      throw new Error400("Stay: " + stayId + " does not exist");
    }
    return await this.orgs.append(orgId, "stayIds", [stayId]);
  }

  public async removeStayFromOrg(orgId: string, stayId: string): Promise<void> {
    return await this.orgs.arrRemove(orgId, "stayIds", [stayId]);
  }

  public async addUserToOrg(orgId: string, userId: string): Promise<void> {
    //Validate user exists
    const userExists = await new UsersService().userExists(userId);
    if (!userExists) {
      throw new Error400("User: " + userId + " does not exist");
    }
    return await this.orgs.append(orgId, "userIds", [userId]);
  }

  public async removeUserFromOrg(orgId: string, userId: string): Promise<void> {
    return await this.orgs.arrRemove(orgId, "userIds", [userId]);
  }
}
