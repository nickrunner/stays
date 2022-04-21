import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Error401 } from "../error";
import { EarlyBooking, EarlyBookingRecord, GetEarlyBookingsResponse, Role } from "../models";
import { EarlyBookingService } from "./earlyBookingService";

@Route("early-bookings")
export class EarlyBookingController extends Controller {
  @Get()
  public async getEarlyBookings(): Promise<EarlyBookingRecord[]> {
    return await new EarlyBookingService().getEarlyBookings();
  }

  @Get("/favorites")
  @Security("user", [Role.Stayer])
  public async getUserEarlyBookings(
    @Request() req: AuthenticatedRequest
  ): Promise<GetEarlyBookingsResponse> {
    try {
      if (!req.thisUser) {
        throw new Error401("Not signed in");
      }
      return await new EarlyBookingService().getUsersEarlyBookings(req.thisUser);
    } catch (err) {
      console.log("Failed getting early bookings");
      throw err;
    }
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
