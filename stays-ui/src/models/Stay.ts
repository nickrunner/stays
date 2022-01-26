import { Entity } from "./Entity";

export interface Photo {
    url: string,
    priority: number,
    description: string
}

export interface Address {
    city: string,
    state: string,
    address: number,
    zip: number,
    street: string
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface Location {
    address: Address,
    coordinates: Coordinates,
    region: string
}

export interface Stay {
    name: string;
    enable: boolean;
    description: string;
    location: Location;
    currentRate: number;
    averageRate: number;
    capacity: number;
    bedrooms: number;
    petsAllowed: boolean;
    onSiteParking: boolean;
    hostEmail: string;
    type?: string[];
    perks?: string[];
    amenities?: string[];
    photos: Photo[];
};

export type StayRecord = Stay & Entity;