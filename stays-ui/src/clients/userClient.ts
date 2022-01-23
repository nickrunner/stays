import { Membership, Role, User } from "../models/User";
import axios from "axios";
import { defCfg, queryCfg } from "./serverConfig";


export const url = "/users";


export class UserClient {

    public async createUser(email: string , firstName: string, lastName: string): Promise<User> {
        const user: User =  {
            firstName: firstName,
            lastName: lastName,
            email: email,
            membership: Membership.Standard,
            roles: [Role.Stayer]
        }
        const response = await axios.post(url, user, await defCfg());
        return response.data as User;
    }

    public async getSelf(): Promise<User> {
        const response = await axios.get(url+"/self", await defCfg());
        const user = response.data as User;
        console.log("Received user: "+user.email);
        return response.data as User;
    }

    public async getUserByEmail(email: string): Promise<User>{
       const response = await axios.get(url, await queryCfg({email: email}));   
       return response.data as User;  
    }
}