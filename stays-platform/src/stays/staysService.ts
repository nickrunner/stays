import { Collection } from "../firebase/firestore/collection";
import { Stay, StayRecord } from "../../../common/models/stay";
import { Error404 } from "../error";

export class StaysService {

    private db: Collection<Stay>;

    public constructor(){
        this.db = new Collection<Stay>("stays");
    }

    public async getStays(filters?: any, or?: boolean): Promise<StayRecord[]> {
        console.log("getStays() test ", {filters});
        const Stay: StayRecord[] = await this.db.getAll(filters, or);
        return Stay;
    }

    public async getStayById(stayId: string): Promise<StayRecord> {
        return await this.db.get(stayId);
    }

    public async getStayByEmail(email: string): Promise<StayRecord>{
        return await this.db.getFirst({email: email});
    }

    public async stayExists(stayId: string): Promise<boolean> {
        return await this.db.exists({id:stayId});
    }

    public async createStay(stay: Stay): Promise<StayRecord> {
        console.log("Creating Stay :) ", {stay});
        const StayRecord: StayRecord = await this.db.create(stay);
        return StayRecord; 
    }

    public async updateStay(stayId: string, attributes: any): Promise<void> {
        if(await this.stayExists(stayId) ){
            await this.db.update(stayId, attributes);
        }
        else{
            throw new Error404();
        }
    }

    public async updateFirstName(stayId: string, firstName: String): Promise<void>{
        await this.db.update(stayId, {firstName: firstName});
    }

    public async deleteStay(stayId: string){
        await this.db.delete(stayId);
    }


}