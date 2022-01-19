import { Coordinates } from "./Coordinates";
import { Address } from "./Address";

export interface Location {
    address: Address,
    coordinates: Coordinates,
    region: string
}