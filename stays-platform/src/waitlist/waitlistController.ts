import { Body, Controller, Post, Route } from "tsoa";

import { WaitlistItem } from "../models";
import { WaitlistService } from "./waitlistService";

@Route("waitlist")
export class WaitlistController extends Controller {
  @Post()
  public async addToWaitlist(@Body() waitlistItem: WaitlistItem) {
    try {
      const service = new WaitlistService();
      await service.addToWaitlist(waitlistItem);
    } catch (e) {
      console.log("addToWaitlist() failed: ", { e });
      throw e;
    }
  }
}
