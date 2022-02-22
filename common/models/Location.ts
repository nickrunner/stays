export interface Address {
    city: string,
    state: string,
    address1: string,
    address2: string,
    zip: number,
    country: string
};

export interface Coordinates {
    latitude: number,
    longitude: number
};

export interface Bounds {
    ne: Coordinates
    sw: Coordinates,
};

export interface Location {
    address: Address,
    coordinates: Coordinates,
    region: string
};