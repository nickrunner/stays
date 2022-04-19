import { Body, Controller, Get, Path, Post, Request, Route, Security } from "tsoa";

import { AuthenticatedRequest } from "../auth/auth";
import { Cancellation, CancellationRecord, Role } from "../models";
import { CancellationService } from "./cancellationService";

@Route("cancellations")
export class CancellationController extends Controller {
  @Get()
  public async getCancellations(): Promise<CancellationRecord[]> {
    return await new CancellationService().getCancellations();
  }
  @Post()
  @Security("user", [Role.Host, Role.Admin])
  public async createCancellation(
    @Request() req: AuthenticatedRequest,
    @Body() promotion: Cancellation
  ): Promise<void> {
    return await new CancellationService().createCancellation(promotion, req.email);
  }
}
