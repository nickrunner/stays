import { Collection } from "../firebase/firestore/collection";
import { Coordinates, Stay, StayApplicationStatus, StayRecord, StayRejectionInfo, StaySearchFilter } from "../../../common/models/stay";
import { Error400, Error404 } from "../error";
import ow from 'ow';
import LocationService from "../locationService";
import { User } from "../../../common/models/user";
import { access } from "fs";
import { CollectionQuery } from "../firebase/firestore/collectionQuery";

export class StaysService {

    private stays: Collection<Stay>;

    public constructor(){
        this.stays = new Collection<Stay>("stays");
    }

    private resolveFilter(filter: StaySearchFilter): CollectionQuery  {
        const query = new CollectionQuery()
        .where("name").eq(filter.name)
        .and("enable").eq(filter.enable)
        .and("city").eq(filter.city)
        .and("state").eq(filter.state)
        .and("zip").eq(filter.zip)
        .and("petsAllowed").eq(filter.petsAllowed)
        .and("onSiteParking").eq(filter.onSiteParking)
        .and("status").eq(filter.status)
        .and("type").arrContainsAny(filter.type)
        .and("perks").arrContainsAny(filter.specialInterests)
        .and("amenities").arrContainsAny(filter.amenities)
        .and("tags").arrContainsAny(filter.tags);
        if(filter.bounds){
            let key = "location.coordinates.latitude";
            query.and(key).inRange(key, filter.bounds.sw.latitude, filter.bounds.ne.latitude);
            key = "location.coordinates.longitude";
            query.and(key).inRange(key, filter.bounds.sw.longitude, filter.bounds.ne.longitude);
        }
        if(filter.rate){
            query.and("currentRate").inRange("currentRate", filter.rate.min, filter.rate.max);
        }
        if(filter.capacity){
            query.and("capacity").inRange("capacity", filter.capacity.min, filter.capacity.max);
        }
        if(filter.bedrooms){
            query.and("bedrooms").inRange("bedrooms", filter.bedrooms.min, filter.bedrooms.max);
        }
        
        return query;
    } 

    public async getStays(filter?: StaySearchFilter): Promise<StayRecord[]> {
        console.log("getStays() test ", {filter});
        if(filter){
            return await this.stays.getAll(this.resolveFilter(filter));
        }
        else{
            return await this.stays.getAll();
        }
    }

    public async getStayById(stayId: string): Promise<StayRecord> {
        return await this.stays.get(stayId);
    }

    public async stayExists(stayId: string): Promise<boolean> {
        return await this.stays.exists(
            new CollectionQuery().where("id").eq(stayId)
        );
    }

    public async publishStay(stayId: string, clientId?: string): Promise<void> {
        console.log("Publishing Stay ", {stayId});
        const stay = await this.stays.get(stayId);
        await this.validateStay(stay);
        await this.stays.update(stayId, {status: StayApplicationStatus.Accepted}, clientId); 
    }

    public async rejectStay(stayId: string, rejectionInfo: StayRejectionInfo, clientId?: string): Promise<void> {
        console.log("Rejecting stay: "+stayId, {rejectionInfo});
        await this.stays.update(stayId, {status: StayApplicationStatus.Rejected}, clientId);
    }

    public async disableStay(stayId: string, clientId?:string): Promise<void> {
        console.log("Disabling stay: "+stayId);
        await this.stays.update(stayId, {enabled: false}, clientId);
    }

    public async enableStay(stayId: string, clientId?:string): Promise<void> {
        console.log("Enabling stay: "+stayId);
        await this.stays.update(stayId, {enabled: true}, clientId);
    }

    public async createApplication(stay: Stay, email:string): Promise<StayRecord> {
        console.log("Creating stay application: ", {stay});
        stay.status = StayApplicationStatus.Pending;
        await this.validateStay(stay);
        return await this.stays.create(stay);
    }

    public async createStay(stay: Stay): Promise<StayRecord> {
        console.log("Creating stay: ", {stay});
        stay.status = StayApplicationStatus.Accepted;
        await this.validateStay(stay);
        return await this.stays.create(stay);
    }

    public async updateStay(stayId: string, attributes: any): Promise<void> {
        if(await this.stayExists(stayId) ){
            await this.stays.update(stayId, attributes);
        }
        else{
            throw new Error404();
        }
    }

    public async deleteStay(stayId: string){
        await this.stays.delete(stayId);
    }

    private async validateStay(stay: Stay){
        console.log("Validating stay");
        
        console.log("Coordinates not present... running geocoder");
        ow(stay, ow.object.partialShape({
            location: {
                address: {
                    city: ow.string.nonEmpty,
                    state: ow.string.nonEmpty,
                    address1: ow.string.nonEmpty,
                    zip: ow.number
                }
            }
        }));
        const coordinates: Coordinates = await new LocationService().getCoordinates(stay.location.address);
        stay.location.coordinates.latitude = coordinates.latitude;
        stay.location.coordinates.longitude = coordinates.longitude;
        try{
            ow(stay, ow.object.partialShape({
                name: ow.string.nonEmpty,
                enable: ow.boolean,
                description: ow.string.nonEmpty,
                location: {
                    address: {
                        city: ow.string.nonEmpty,
                        state: ow.string.nonEmpty,
                        address1: ow.string.nonEmpty,
                        zip: ow.number
                    },
                    region: ow.string
                },
                type: ow.array.nonEmpty,
                perks: ow.array,
                amenities: ow.array,
                photos: ow.array.nonEmpty,
                status: ow.string.nonEmpty
            }));
        }
        catch(e){
            console.log("Failed stay validation: ", {e});
            throw new Error400();
        }
        
    }


}