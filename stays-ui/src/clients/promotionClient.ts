import axios from "axios";
import { Promotion, PromotionRecord } from "../../../common/models/Promotion";
import { defCfg, cfg } from "./serverConfig";


export const url = "/promotions";

export class PromotionClient{

    public async isPromoCodeValid(promoName: string, promoCode: string): Promise<boolean> {
        const isValid:boolean = await (await axios.get(url+"/"+promoName+"/"+promoCode+"/validate", cfg())).data;
        console.log("Promo Code: "+promoCode+" is valid? "+isValid);
        return isValid;
    }
}