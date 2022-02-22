import axios from "axios";
import { cfg } from "./serverConfig";
import { WaitlistItem } from "../../../common/models/WaitlistItem";

export const url = "/waitlist";

export class WaitlistClient {
    public async addToWaitlist(email: string, isStayer: boolean, isHost: boolean){
        const item: WaitlistItem = {
            email: email,
            isStayer: isStayer,
            isHost: isHost
        };
        await axios.post(url, item, cfg());
    }
}