import { User, UserRecord } from "../../../common/models/user";
import { Error404, Error409 } from "../error";
import { Collection } from "../firebase/firestore/collection";

const USERS_COLLECTION = "users";

export class UsersService {

    private db: Collection<User>;
    public constructor() {
        this.db = new Collection<User>(USERS_COLLECTION);
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

    public async createUser(user: User): Promise<UserRecord> {
        console.log("Creating User :) "+user.email);
        const userExists: boolean = await this.db.exists
        (
            {
                email: user.email
            }
        )
        console.log("User exists: "+userExists);
        if(userExists == false){ 
            const userRecord: UserRecord = await this.db.create(user);
            return userRecord; 
        }
        else{
            console.log("UserService", "User already exists!")
            throw new Error409("User with email "+user.email+" already exists");
        }   
    }

    public async updateUser(userId: string, attributes: any): Promise<void> {
        if(await this.userExists(userId) ){
            await this.db.update(userId, attributes);
        }
        else{
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