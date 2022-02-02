import { Role, UserMembership, User, UserRecord, UserSearchFilter } from "../../../common/models/user";
import { Error404, Error409 } from "../error";
import { Collection } from "../firebase/firestore/collection";
import { CollectionFilter, CollectionFilterBuilder } from "../firebase/firestore/collectionFilter";


export class UsersService {

    private users: Collection<User>;
    public constructor() {
        this.users = new Collection<User>("users");
    }

    private resolveFilter(filter: UserSearchFilter): CollectionFilter[] {
        const builder: CollectionFilterBuilder = new CollectionFilterBuilder();
        builder.add("firstName", "==", filter.firstName);
        builder.add("lastName", "==", filter.lastName);
        builder.add("enabled", "==", filter.enabled);
        builder.add("email", "==", filter.email);
        builder.add("userMembership", "==", filter.userMembership);
        if(filter.lastActive){
            builder.add("lastActive", ">=", filter.lastActive.min);
            builder.add("lastActive", "<=", filter.lastActive.max);
        }
        builder.add("roles", "array-contains-any", filter.roles);
        return builder.build();
    }

    public async getUsers(filter?: UserSearchFilter): Promise<UserRecord[]> {
        console.log("getUsers() test ", {filter});
        if(filter){
            return await this.users.getAll(this.resolveFilter(filter));
        }
        else{
            return await this.users.getAll();
        }
    }

    public async getUserById(userId: string): Promise<UserRecord> {
        return await this.users.get(userId);
    }

    public async getUserByEmail(email: string): Promise<UserRecord>{
        const filter: CollectionFilter = {
            key: "email",
            op: "==",
            val: email,
            or: false
        }
        return await this.users.getFirst([filter]);
    }

    public async userExists(userId: string): Promise<boolean> {
        return await this.users.exists(new CollectionFilterBuilder().add("id", "==", userId).build());
    }

    public async createDefaultUser(email: string, clientId?: string):Promise<UserRecord> {
        console.log("Creating default user with email: "+email);
        const user: User =  {
            enabled: true,
            firstName: "",
            lastName: "",
            email: email,
            userMembership: UserMembership.Standard,
            lastActive: Date.now(),
            roles: [Role.Stayer]
        }
        return await this.createUser(user, clientId);
    }

    public async createUser(user: User, clientId?: string): Promise<UserRecord> {
        console.log("Creating User :) "+user.email);
        const userExists: boolean = await this.users.exists
        (
           new CollectionFilterBuilder().add("email", "==", user.email).build()
        )
        console.log("User exists: "+userExists);
        if(userExists == false){ 
            const userRecord: UserRecord = await this.users.create(user, clientId);
            return userRecord; 
        }
        else{
            console.log("UserService", "User already exists!")
            throw new Error409("User with email "+user.email+" already exists");
        }   
    }

    public async updateUser(userId: string, attributes: any, clientId?: string): Promise<void> {
        if(await this.userExists(userId) ){
            await this.users.update(userId, attributes, clientId);
        }
        else{
            console.log("Tried to update user that was no found in DB: "+userId);
            throw new Error404();
        }
    }

    public async updateFirstName(userId: string, firstName: String): Promise<void>{
        await this.users.update(userId, {firstName: firstName});
    }

    public async deleteUser(userId: string){
        await this.users.delete(userId);
    }

}