import { Collection } from "../../firebase/firestore/collection";
import { StayAttribute, StayAttributeRecord, StayAttributeType } from "../../../../common/models/StayAttributes";
import { Error400, Error401, Error404, Error409 } from "../../error";
import { CollectionQuery } from "../../firebase/firestore/collectionQuery";

export class StayAttributesService {

    private stayAttributes: Collection<StayAttribute>;

    public constructor() {
        this.stayAttributes = new Collection<StayAttribute>("stayAttributes");
    }

    public async getStayAttributes(type: StayAttributeType): Promise<StayAttributeRecord[]>{
        const attributes: StayAttributeRecord[] = await this.stayAttributes.getAll(
            new CollectionQuery().where("type").eq(type)
        );
        return attributes;
    }

    public async createStayAttribute(attribute: StayAttribute, clientId: string): Promise<StayAttributeRecord>{
        if(!await this.stayAttributes.exists(
            new CollectionQuery().where("name").eq(attribute.name)
        )){
            return await this.stayAttributes.create(attribute, clientId);
        }
        else {
            throw new Error409();
        }
    }
}
