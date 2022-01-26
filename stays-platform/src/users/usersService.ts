import { HostMembersip, Role, StayerMembership, User, UserRecord } from "../../../common/models/user";
import { Error404, Error409 } from "../error";
import { Collection } from "../firebase/firestore/collection";


export class UsersService {

    private db: Collection<User>;
    public constructor() {
        this.db = new Collection<User>("users");
    }

    public async getUsers(filters?: any, or?: boolean): Promise<UserRecord[]> {
        console.log("getUsers() test ", {filters});
        const user: UserRecord[] = await this.db.getAll(filters, or);
        return user;
    }

    public async getUserById(userId: string): Promise<UserRecord> {
        return await this.db.get(userId);
    }

    public async getUserByEmail(email: string): Promise<UserRecord>{
        return await this.db.getFirst({email: email});
    }

    public async userExists(userId: string): Promise<boolean> {
        return await this.db.exists({id:userId});
    }

    public async createDefaultUser(email: string, clientId?: string):Promise<UserRecord> {
        console.log("Creating default user with email: "+email);
        const user: User =  {
            enabled: true,
            firstName: "",
            lastName: "",
            email: email,
            stayerMembership: StayerMembership.Standard,
            hostMembership: HostMembersip.None,
            lastActive: Date.now(),
            roles: [Role.Stayer]
        }
        return await this.createUser(user, clientId);
    }

    public async createUser(user: User, clientId?: string): Promise<UserRecord> {
        console.log("Creating User :) "+user.email);
        const userExists: boolean = await this.db.exists
        (
            {
                email: user.email
            }
        )
        console.log("User exists: "+userExists);
        if(userExists == false){ 
            const userRecord: UserRecord = await this.db.create(user, clientId);
            return userRecord; 
        }
        else{
            console.log("UserService", "User already exists!")
            throw new Error409("User with email "+user.email+" already exists");
        }   
    }

    public async updateUser(userId: string, attributes: any, clientId?: string): Promise<void> {
        if(await this.userExists(userId) ){
            await this.db.update(userId, attributes, clientId);
        }
        else{
            console.log("Tried to update user that was no found in DB: "+userId);
            throw new Error404();
        }
    }

    public async updateFirstName(userId: string, firstName: String): Promise<void>{
        await this.db.update(userId, {firstName: firstName});
    }

    public async deleteUser(userId: string){
        await this.db.delete(userId);
    }

}