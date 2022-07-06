import { Body, Controller, Delete, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Error401 } from "../error";
import { Cancellation, CancellationRecord, GetCancellationsResponse, Role } from "../models";
import { CancellationService } from "./cancellationService";

@Route("cancellations")
export class CancellationController extends Controller {
  @Get()
  public async getCancellations(): Promise<CancellationRecord[]> {
    return await new CancellationService().getCancellations();
  }

  @Get("/favorites")
  @Security("user")
  public async getUsersCancellations(
    @Request() req: AuthenticatedRequest
  ): Promise<GetCancellationsResponse> {
    try {
      if (!req.thisUser) {
        throw new Error401("Not signed in");
      }
      return await new CancellationService().getUsersCancellations(req.thisUser);
    } catch (err) {
      console.log("Failed getting favorites cancallations");
      throw err;
    }
  }

  @Post()
  @Security("user", [Role.Host, Role.Admin])
  public async createCancellation(
    @Request() req: AuthenticatedRequest,
    @Body() promotion: Cancellation
  ): Promise<void> {
    return await new CancellationService().createCancellation(promotion, req.email);
  }

  @Delete("{cancellationId}")
  @Security("user", [Role.Host])
  public async deleteCancellation(@Path() cancellationId: string): Promise<void> {
    try {
      return await new CancellationService().deleteCancellation(cancellationId);
    } catch (err) {
      console.log("Failed deleting cancellation");
      throw err;
    }
  }
}
