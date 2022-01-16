import {
    Body,
    Controller,
    Get,
    Path,
    Post,
    Route,
    Query,
    Patch,
    Delete,
    Security
  } from "tsoa";

import { Stay, StayRecord } from "../../../common/models/stay";
import { StaysService } from "./staysService";

@Route("stays")
export class StaysController extends Controller {
    
    @Get("{stayId}")
    public async getStayById(
        @Path() stayId: string,
    ): Promise<StayRecord> {
        try{
            return await new StaysService().getStayById(stayId)
        }
        catch(e){
            console.log("stay: "+stayId+" not found");
            throw e;
        }
    }

    @Get()
    public async getStays(
        @Query() name?: string ,
        @Query() region?: string,
        @Query() petsAllowed?: boolean, 
        @Query() onSiteParking?: boolean,
        @Query() hostId?: string, 
        @Query() or?: boolean
    ): Promise<StayRecord[]> {
        const filters = {
            name: name,
            region: region,
            petsAllowed: petsAllowed,
            onSiteParking: onSiteParking,
            hostId: hostId
        }
        return await new StaysService().getStays(filters, or);
    }

    @Post()
    public async createStay(
        @Body() stay: Stay
    ): Promise<StayRecord> {
        console.log("POST /stays with body ", {stay});
        try{
            return await new StaysService().createStay(stay);
        }
        catch(e){
            console.log("createStay() Error: "+e);
            throw e;
        }
    }

    @Post("{stayId}")
    public async updateStay(
        @Path() stayId: string,
        @Body() stay: Stay
    ): Promise<StayRecord> {
        try{
            const stayService = new StaysService();
            await stayService.updateStay(stayId, stay);
            return await stayService.getStayById(stayId);
        }
        catch(e){
            console.log("updateStay() Error: "+e);
            throw e;
        }
    }

    @Patch("{stayId}")
    public async patchStay(
        @Path() stayId: string,
        @Body() attributes: any
    ): Promise<void> {
        try{
            await new StaysService().updateStay(stayId, attributes);
        }
        catch(e){
            console.log("patchStay() Error: "+e);
            throw e;
        }
    }

    @Delete("{stayId}")
    public async deleteStay(
        @Path() stayId: string
    ): Promise<void> {
        try{
            await new StaysService().deleteStay(stayId);
        }
        catch(e){
            console.log("deleteStay() Error: "+e);
            throw e;
        }
    }
    
}