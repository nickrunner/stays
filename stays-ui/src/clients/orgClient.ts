import axios from "axios";

import { Org, OrgRecord } from "../models";
import { defCfg } from "./serverConfig";

const url = "/orgs";

export class OrgClient {
  public async createOrg(org: Org): Promise<OrgRecord> {
    const response = await axios.post(url, org, await defCfg());
    return response.data as OrgRecord;
  }

  public async getOrgs(): Promise<OrgRecord[]> {
    const response = await axios.get(url, await defCfg());
    return response.data as OrgRecord[];
  }

  public async getOrg(orgId: string): Promise<OrgRecord> {
    const response = await axios.get(url + "/" + orgId, await defCfg());
    return response.data as OrgRecord;
  }

  public async updateOrgName(orgId: string, name: string): Promise<void> {
    await axios.patch(url + "/" + orgId, { name: name }, await defCfg());
  }

  public async addUserToOrg(orgId: string, userId: string): Promise<void> {
    await axios.put(url + "/" + orgId + "/users/" + userId, await defCfg());
  }

  public async removeUserFromOrg(orgId: string, userId: string): Promise<void> {
    await axios.delete(url + "/" + orgId + "/users/" + userId, await defCfg());
  }

  public async addStayToOrg(orgId: string, stayId: string): Promise<void> {
    await axios.put(url + "/" + orgId + "/stays/" + stayId, await defCfg());
  }

  public async removeStayFromOrg(orgId: string, stayId: string): Promise<void> {
    await axios.delete(url + "/" + orgId + "/stays/" + stayId, await defCfg());
  }
}
