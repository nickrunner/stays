import NodeGeocoder from "node-geocoder";
import ow from "ow";

import { Address, Coordinates } from "../../common/models/Location";
import { Error500 } from "./error";
import { GOOGLE_MAPS_API_KEY } from "./secrets";

export default class LocationService {
  private geocoder: NodeGeocoder.Geocoder;

  public constructor() {
    const options: NodeGeocoder.Options = {
      provider: "google",
      apiKey: GOOGLE_MAPS_API_KEY
    };
    this.geocoder = NodeGeocoder(options);
  }

  public async getCoordinates(address: Address): Promise<Coordinates> {
    console.log("Getting coordinates from address: ", { address });
    ow(address, ow.object.nonEmpty);
    let addr = "";
    if (address.address1) {
      addr = address.address1;
    }
    if (address.address2) {
      addr += " " + address.address2;
    }
    if (address.city) {
      addr += " " + address.city;
    }
    if (address.state) {
      addr += " " + address.state;
    }
    if (addr === "") {
      throw new Error500("Not enough location information to geocode!");
    }
    const res = await this.geocoder.geocode({
      address: addr,
      country: address.country,
      zipcode: address.zip.toString()
    });

    if (!res) {
      throw new Error500("Could not locate address");
    }

    if (res.length < 1) {
      throw new Error500("Could not locate address");
    }
    console.log("Got geocoder response: ", { res });
    if (!res[0].latitude || !res[0].longitude) {
      throw new Error("Could not geocode location");
    }

    return {
      latitude: res[0].latitude,
      longitude: res[0].longitude
    };
  }
}
