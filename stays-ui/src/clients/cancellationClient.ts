import axios from "axios";

import { Cancellation, CancellationRecord, GetCancellationsResponse } from "../models";
import { cfg, defCfg } from "./serverConfig";

export const url = "/cancellations";

export class CancellationClient {
  public async createCancellation(cancellation: Cancellation) {
    await axios.post(url, cancellation, await defCfg());
  }

  public async getCancellations(): Promise<CancellationRecord[]> {
    const response = await axios.get(url, await defCfg());
    return response.data as CancellationRecord[];
  }

  public async getCancellationsFromFavorites(): Promise<GetCancellationsResponse> {
    const response = await axios.get(url + "/favorites", await defCfg());
    return response.data as GetCancellationsResponse;
  }

  public async deleteCancellation(cancellationId: string): Promise<void> {
    await axios.delete(url + "/" + cancellationId, await defCfg());
  }
}
