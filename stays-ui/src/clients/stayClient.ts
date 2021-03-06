import axios from "axios";

import { Pagination } from "../models";
import { StayAttributeRecord, StayAttributeType } from "../models";
import { Stay, StayRecord, StaySearchFilter } from "../models";
import { cfg, defCfg, queryCfg } from "./serverConfig";

export const url = "/stays";

export class StayClient {
  public async createStay(stay: Stay): Promise<Stay> {
    const response = await axios.post(url, stay, await defCfg());
    return response.data as Stay;
  }

  public async setStayName(stayId: string, name: string): Promise<StayRecord> {
    const response = await axios.patch(url + "/" + stayId, { name: name }, await defCfg());
    return response.data as StayRecord;
  }

  public async patchStay(
    stayId: string,
    key: string,
    val: string | number | boolean
  ): Promise<StayRecord> {
    const response = await axios.patch(url + "/" + stayId, { [key]: val }, await defCfg());
    return response.data as StayRecord;
  }

  public async getStays(
    searchPhrase?: string,
    filter?: StaySearchFilter,
    pagination?: Pagination
  ): Promise<StayRecord[]> {
    const response = await axios.get(
      url,
      await queryCfg(
        {
          search: searchPhrase,
          filter: JSON.stringify(filter),
          pagination: JSON.stringify(pagination)
        },
        true
      )
    );
    return response.data as StayRecord[];
  }

  public async getStayAttributes(
    stayAttributeType: StayAttributeType
  ): Promise<StayAttributeRecord[]> {
    const response = await axios.get(url + "/attributes/" + stayAttributeType, cfg());
    return response.data as StayAttributeRecord[];
  }

  public async addStayAttribute(
    stayAttributeType: StayAttributeType,
    name: string,
    icon?: string,
    description?: string
  ) {
    const response = await axios.post(
      url + "/attributes/" + stayAttributeType,
      {
        name: name,
        type: stayAttributeType,
        iconUrl: icon,
        description: description
      },
      await defCfg()
    );
    return response;
  }

  public async getPropertyTypes(): Promise<StayAttributeRecord[]> {
    const response = await axios.get(url + "/attributes/propertyTypes", await defCfg());
    return response.data as StayAttributeRecord[];
  }

  public async getAmenitites(): Promise<StayAttributeRecord[]> {
    const response = await axios.get(url + "/attributes/amenities", await defCfg());
    return response.data as StayAttributeRecord[];
  }

  public async getSpecialInterests(): Promise<StayAttributeRecord[]> {
    const response = await axios.get(url + "/attributes/specialInterests", await defCfg());
    return response.data as StayAttributeRecord[];
  }
}
