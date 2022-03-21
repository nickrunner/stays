import * as _ from "lodash";
import ow from "ow";

import { Error400, Error409 } from "../../error";
import { Collection } from "../../firebase/firestore/collection";
import { CollectionQuery } from "../../firebase/firestore/collectionQuery";
import { Stay, StayAttribute, StayAttributeRecord, StayAttributeType } from "../../models";

export class StayAttributesService {
  private stayAttributes: Collection<StayAttribute>;

  public constructor() {
    this.stayAttributes = new Collection<StayAttribute>("stayAttributes");
  }

  public async getStayAttributes(type: StayAttributeType): Promise<StayAttributeRecord[]> {
    const attributes: StayAttributeRecord[] = await this.stayAttributes.getAll(
      new CollectionQuery().where("type").eq(type)
    );
    return _.orderBy(attributes, ["name"], ["asc"]);
  }

  public async createStayAttribute(
    attribute: StayAttribute,
    clientId?: string
  ): Promise<StayAttributeRecord> {
    if (
      !(await this.stayAttributes.exists(
        new CollectionQuery().where("name").eq(attribute.name).and("type").eq(attribute.type)
      ))
    ) {
      return await this.stayAttributes.create(attribute, clientId);
    } else {
      throw new Error409("Attribute: " + attribute.name + " already exists");
    }
  }

  public async createOrUpdateStayAttribute(
    attribute: StayAttribute,
    clientId?: string
  ): Promise<void> {
    this.validateStayAttribute(attribute);
    const query: CollectionQuery = new CollectionQuery()
      .where("name")
      .eq(attribute.name)
      .and("type")
      .eq(attribute.type);
    if (!(await this.stayAttributes.exists(query))) {
      await this.stayAttributes.create(attribute, clientId);
    }
    // else{
    //     return await this.stayAttributes.updateFirst(query);
    // }
  }

  public async updateStayAttribute(
    stayAttributeId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes: any,
    clientId?: string
  ): Promise<void> {
    await this.stayAttributes.update(stayAttributeId, attributes, clientId);
  }

  public async addStayAttributesFromStay(stay: Stay) {
    if (stay.location.region) {
      await this.createOrUpdateStayAttribute({
        type: StayAttributeType.Region,
        name: stay.location.region
      });
    }
    if (stay.location.address.state) {
      await this.createOrUpdateStayAttribute({
        type: StayAttributeType.State,
        name: stay.location.address.state
      });
    }
    if (stay.location.address.country) {
      await this.createOrUpdateStayAttribute({
        type: StayAttributeType.Country,
        name: stay.location.address.country
      });
    }
  }

  public async validateStayAttribute(attribute: StayAttribute) {
    try {
      ow(
        attribute,
        ow.object.partialShape({
          name: ow.string.nonEmpty,
          type: ow.string.nonEmpty
        })
      );
    } catch (e) {
      console.log("Failed stay validation: ", { e });
      throw new Error400();
    }
  }
}
