import { Collection } from "../../firebase/firestore/collection";
import { StayAttribute, StayAttributeRecord, StayAttributeType } from "../../../../common/models/StayAttributes";
import { Error400, Error401, Error404, Error409 } from "../../error";
import { CollectionFilter, CollectionFilterBuilder } from "../../firebase/firestore/collectionFilter";

export class StayAttributesService {

    private db: Collection<StayAttribute>;

    public constructor() {
        this.db = new Collection<StayAttribute>("stayAttributes");
    }

    public async getStayAttributes(type: StayAttributeType): Promise<StayAttributeRecord[]>{
        const collectionFilter: CollectionFilter = {key: "type", op: "==", val:type, or: false};
        const attributes: StayAttributeRecord[] = await this.db.getAll([collectionFilter]);
        return attributes;
    }

    public async createStayAttribute(attribute: StayAttribute, clientId: string): Promise<StayAttributeRecord>{
        if(!await this.db.exists(
            new CollectionFilterBuilder().add("name", "==", attribute.name).build()
        )){
            return await this.db.create(attribute, clientId);
        }
        else {
            throw new Error409();
        }
    }
}
