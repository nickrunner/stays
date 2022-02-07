import { Body, Controller, Post, Route, Security } from "tsoa";
import { WaitlistItem } from "../../../common/models/WaitlistItem";
import { WaitlistService } from "./waitlistService";

@Route("waitlist")
export class WaitlistController extends Controller {
    @Post() 
    public async addToWaitlist(
        @Body() waitlistItem: WaitlistItem
    ){
        try{
            const service = new WaitlistService();
            await service.addToWaitlist(waitlistItem);
        }
        catch(e){
            console.log("addToWaitlist() failed: ", {e});
            throw e;
        }
    }
}