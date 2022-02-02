import NodeGeocoder from 'node-geocoder';
import { Address, Coordinates } from "../../common/models/stay";
import { Error500 } from "./error";
import ow from "ow";

const API_KEY: string = "AIzaSyAIWw4jpYTFQCc0273z1vjUMf8U44nSas8";
export default class LocationService{
    
    private geocoder: any;

    public constructor(){
        const options: NodeGeocoder.Options = {
            provider: 'google',
            apiKey: API_KEY
        }
        this.geocoder = NodeGeocoder(options);
    }

    public async getCoordinates(address: Address): Promise<Coordinates>{
        ow(address,  ow.object.partialShape({
            country: ow.string.nonEmpty,
            address1: ow.string.nonEmpty,
            zip: ow.number
        }));
        const res = await this.geocoder.geocode({
            address: address.address1+" "+address.address2,
            country: address.country,
            zipcode: address.zip
        });

        if(!res){
            throw new Error500("Could not locate address");
        }

        if(res.length < 1){
            throw new Error500("Could not locate address");
        }

        return {
            latitude: res[0].latitude,
            longitude: res[1].longitude
        }
    }

}