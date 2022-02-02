import axios from "axios";
import { defCfg, queryCfg } from "./serverConfig";
import { Stay, StayRecord, StaySearchFilter } from "../models/Stay";
import { StayAttributeRecord, StayAttributeType } from "../models/StayAttributes";

export const url = "/stays";


export class StayClient {

    public async createStay(stay: Stay): Promise<Stay> {
        const response = await axios.post(url, stay, await defCfg());
        return response.data as Stay;
    }

    public async getStays(filter: StaySearchFilter): Promise<StayRecord[]>{
       const response = await axios.get(url, await queryCfg({filter: filter}));   
       return response.data as StayRecord[];  
    }

    public async getStayAttributes(stayAttributeType: StayAttributeType): Promise<StayAttributeRecord[]> {
        const response = await axios.get(url+"/attributes/"+stayAttributeType, await defCfg());
        return response.data as StayAttributeRecord[];
    }

    public async addStayAttribute(stayAttributeType: StayAttributeType, name: string, icon?: string, description?: string){
        const response = await axios.post(
            url+"/attributes/"+stayAttributeType, 
            {
                name: name, 
                type: stayAttributeType, 
                iconUrl: icon, 
                description: description
            }, 
            await defCfg());
        return response;
    }

    public async getPropertyTypes(): Promise<StayAttributeRecord[]>{
        const response = await axios.get(url+"/attributes/propertyTypes", await defCfg());
        return response.data as StayAttributeRecord[];
    }

    public async getAmenitites(): Promise<StayAttributeRecord[]>{
        const response = await axios.get(url+"/attributes/amenities", await defCfg());
        return response.data as StayAttributeRecord[];
    }

    public async getSpecialInterests(): Promise<StayAttributeRecord[]>{
        const response = await axios.get(url+"/attributes/specialInterests", await defCfg());
        return response.data as StayAttributeRecord[];
    }
}