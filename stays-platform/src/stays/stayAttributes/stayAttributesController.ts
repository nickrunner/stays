import {
    Controller,
    Get,
    Post,
    Path,
    Route,
    Body,
    Security,
    Request
  } from "tsoa";
import { StayAttribute, StayAttributeRecord, StayAttributeType } from "../../../../common/models/StayAttributes";
import { Role } from "../../../../common/models/user";
import { AuthenticatedRequest } from "../../auth/auth";
import { Error401, Error409 } from "../../error";
import { StayAttributesService } from "./stayAttributesService";


@Route("stays/attributes")
export class StayAttributesController extends Controller {

  @Get("{type}")
  public async getStayAttributes(
    @Path() type: StayAttributeType
  ): Promise<StayAttributeRecord[]>{
    try{
      const service: StayAttributesService = new StayAttributesService();
      return await service.getStayAttributes(type);
    }
    catch(e){
      console.log("error getting stay attributes");
      throw e;
    }
  }

  @Post("{type}")
  @Security("user", [Role.Admin])
  public async addStayAttribute(
    @Request() req: AuthenticatedRequest,
    @Body() attribute: StayAttribute,
    @Path() type: StayAttributeType
  ): Promise<StayAttributeRecord>{
    try{
      if(type != attribute.type){
        throw new Error409
      }
      const service: StayAttributesService = new StayAttributesService();
      if(req.email){
        return await service.createStayAttribute(attribute, req.email);
      }
      else{
        throw new Error401();
      }
      
    }
    catch(e){
      console.log("error getting stay attributes");
      throw e;
    }
  }

}