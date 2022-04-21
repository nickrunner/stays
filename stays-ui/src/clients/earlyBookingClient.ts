import axios from "axios";

import { EarlyBooking, EarlyBookingRecord, GetEarlyBookingsResponse } from "../models";
import { cfg, defCfg } from "./serverConfig";

export const url = "/earlyBookings";

export class EarlyBookingClient {
  public async createEarlyBooking(earlyBooking: EarlyBooking) {
    await axios.post(url, { earlyBooking: earlyBooking }, await defCfg());
  }

  public async getEarlyBookings(): Promise<EarlyBookingRecord[]> {
    const response = await axios.get(url, await defCfg());
    return response.data as EarlyBookingRecord[];
  }

  public async getEarlyBookingsFromFavorites(): Promise<GetEarlyBookingsResponse> {
    const response = await axios.get(url + "/favorites", await defCfg());
    return response.data as GetEarlyBookingsResponse;
  }
}
