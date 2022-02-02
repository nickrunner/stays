import { Collection } from "../firebase/firestore/collection";
import { Stay, StayApplicationStatus, StayRecord, StayRejectionInfo, StaySearchFilter } from "../../../common/models/stay";
import { Error400, Error404 } from "../error";
import ow from 'ow';
import LocationService from "../locationService";
import { User } from "../../../common/models/user";
import { access } from "fs";
import { CollectionFilter, CollectionFilterBuilder } from "../firebase/firestore/collectionFilter";

export class StaysService {

    private stays: Collection<Stay>;

    public constructor(){
        this.stays = new Collection<Stay>("stays");
    }

    private resolveFilter(filter: StaySearchFilter): CollectionFilter[]  {
        const builder = new CollectionFilterBuilder();
        builder.add("name", "==", filter.name);
        builder.add("enable", "==", filter.enable);
        builder.add("city", "==", filter.city);
        builder.add("state", "==", filter.state);
        builder.add("zip", "==", filter.zip);
        if(filter.bounds){
            builder.add("location.coordinates.latitude", ">=", filter.bounds.sw );
            builder.add("location.coordinates.latitude", "<=", filter.bounds.ne);
            builder.add("location.coordinates.longitude", ">=", filter.bounds.sw );
            builder.add("location.coordinates.longitude", "<=", filter.bounds.ne);
        }
        if(filter.rate){
            builder.add("currentRate", ">=", filter.rate.min);
            builder.add("currentRate", "<=", filter.rate.max);
        }
        if(filter.capacity){
            builder.add("capacity", ">=", filter.capacity.min);
            builder.add("capacity", "<=", filter.capacity.max);
        }
        if(filter.bedrooms){
            builder.add("bedrooms", ">=", filter.bedrooms.min);
            builder.add("bedrooms", "<=", filter.bedrooms.max);
        }
        builder.add("petsAllowed", "==", filter.petsAllowed);
        builder.add("onSiteParking", "==", filter.onSiteParking);
        builder.add("type", "array-contains-any", filter.type);
        builder.add("perks", "array-contains-any", filter.specialInterests);
        builder.add("amenities", "array-contains-any", filter.amenities);
        builder.add("tags", "array-contains-any", filter.tags);
        builder.add("status", "==", filter.status);

        return  builder.build();
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
            new CollectionFilterBuilder().add("id", "==", stayId).build()
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
        try{
            ow(stay.location.coordinates, ow.object.nonEmpty);
        }
        catch{
            stay.location.coordinates = await new LocationService().getCoordinates(stay.location.address);
        }
        try{
            ow(stay, ow.object.exactShape({
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
                    coordinates: {
                        latitude: ow.number,
                        longitute: ow.number
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