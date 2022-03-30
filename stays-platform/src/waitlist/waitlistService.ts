import ow from "ow";

import { Collection } from "../firebase/firestore/collection";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";
import { WaitlistItem } from "../models";

export class WaitlistService {
  private waitlist: Collection<WaitlistItem>;

  public constructor() {
    this.waitlist = new Collection<WaitlistItem>("waitlist");
  }

  private validateWaitlistItem(item: WaitlistItem) {
    ow(
      item,
      ow.object.partialShape({
        email: ow.string.nonEmpty,
        name: ow.string.nonEmpty,
        continent: ow.string.nonEmpty,
        isStayer: ow.boolean,
        isHost: ow.boolean
      })
    );
  }

  public async isInWaitlist(email: string): Promise<boolean> {
    const query = new CollectionQuery().where("email").eq(email);
    const exists = await this.waitlist.exists(query);
    return exists;
  }

  public async addToWaitlist(item: WaitlistItem) {
    this.validateWaitlistItem(item);
    if (await this.isInWaitlist(item.email)) {
      await this.waitlist.updateFirst(item);
    } else {
      await this.waitlist.create(item);
    }
  }
}
