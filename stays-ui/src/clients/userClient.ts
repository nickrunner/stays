import axios from "axios";
import { UserMembership, Role, UserSearchFilter, UserRecord, User } from "../../../common/models/User";
import { defCfg, queryCfg } from "./serverConfig";

export const url = "/users";

export class UserClient {

    public async createUser(email: string , firstName: string, lastName: string): Promise<User> {
        const user: User =  {
            enabled: true,
            firstName: firstName,
            lastName: lastName,
            email: email,
            userMembership: UserMembership.Standard,
            lastActive: Date.now(),
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
        const filter: UserSearchFilter = {
            email: email
        }
       const response = await axios.get(url, await queryCfg({filter: filter}));   
       return response.data as User;  
    }

    public async getUserById(userId: string): Promise<UserRecord>{
        const response = await axios.get(url, await queryCfg({id: userId}));   
        return response.data as UserRecord; 
    }

    public async getUsers(filters: any): Promise<UserRecord[]>{
        const response = await axios.get(url, await queryCfg(filters));   
        return response.data as UserRecord[];  
     }
}