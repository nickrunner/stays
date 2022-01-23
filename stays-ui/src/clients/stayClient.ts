import { Membership, Role, User } from "../models/User";
import axios from "axios";
import { defCfg, queryCfg } from "./serverConfig";
import { Stay } from "../models/Stay";


export const url = "/stays";


export class StayClient {

    public async createStay(stay: Stay): Promise<Stay> {
        const response = await axios.post(url, stay, await defCfg());
        return response.data as Stay;
    }

    public async getUserByEmail(email: string): Promise<User>{
       const response = await axios.get(url, await queryCfg({email: email}));   
       return response.data as User;  
    }
}