import { Collection } from "../../firebase/firestore/collection";
import { StayAttribute, StayAttributeRecord, StayAttributeType } from "../../../../common/models/StayAttributes";
import { Error400, Error401, Error404, Error409 } from "../../error";

export class StayAttributesService {

    private db: Collection<StayAttribute>;

    public constructor() {
        this.db = new Collection<StayAttribute>("stayAttributes");
    }

    public async getStayAttributes(type: StayAttributeType): Promise<StayAttributeRecord[]>{
        const attributes: StayAttributeRecord[] = await this.db.getAll({type: type})
        return attributes;
    }

    public async createStayAttribute(attribute: StayAttribute, clientId: string): Promise<StayAttributeRecord>{
        if(!await this.db.exists({name: attribute.name})){
            return await this.db.create(attribute, clientId);
        }
        else {
            throw new Error409();
        }
    }

    public async updateAmenity(amenityId: string, attributes: any): Promise<void> {
        if(await this.db.exists(amenityId)){
            await this.db.update(amenityId, attributes);
        }
        else{
            throw new Error404();
        }
    }

}
