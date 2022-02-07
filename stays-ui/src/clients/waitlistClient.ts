import axios from "axios";
import { WaitlistItem } from "../models/WaitlistItem";
import { cfg } from "./serverConfig";

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