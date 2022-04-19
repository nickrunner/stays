import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { EarlyBooking, EarlyBookingRecord, Role } from "../models";
import { EarlyBookingService } from "./earlyBookingService";

@Route("early-bookings")
export class EarlyBookingController extends Controller {
  @Get()
  public async getEarlyBookings(): Promise<EarlyBookingRecord[]> {
    return await new EarlyBookingService().getEarlyBookings();
  }
  @Post()
  @Security("user", [Role.Host, Role.Admin])
  public async createEarlyBooking(
    @Request() req: AuthenticatedRequest,
    @Body() earlyBooking: EarlyBooking
  ): Promise<void> {
    return await new EarlyBookingService().createEarlyBooking(earlyBooking, req.email);
  }
}
