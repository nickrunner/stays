import { Entity } from "./Entity";

export interface Photo {
    url: string,
    priority: number,
    description: string
}

export interface Range {
    min: number;
    max: number;
}

export interface Address {
    city: string,
    state: string,
    address1: string,
    address2: string,
    zip: number,
    country: string
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

export interface Bounds {
    ne: Coordinates
    sw: Coordinates,
}

export interface Location {
    address: Address,
    coordinates: Coordinates,
    region: string
}

export enum StayMembership {
    None = "None",
    Standard = "Standard",
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum"
};


export enum StayApplicationStatus {
    Pending = "Pending",
    Rejected = "Rejected",
    Accepted = "Accepted"
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
    type: string[];
    perks: string[];
    amenities: string[];
    tags: string[];
    photos: Photo[];
    status: StayApplicationStatus;
};

export interface StaySearchFilter {
    name?: string;
    enable?: boolean;
    city?: string;
    state?: string;
    country?: string;
    zip?: number;
    bounds?: Bounds;
    rate?: Range;
    capacity?: Range;
    bedrooms?: Range;
    petsAllowed?: boolean;
    onSiteParking?: boolean;
    type?: string[];
    specialInterests?: string[];
    tags?: string[];
    amenities?: string[];
    status?: StayApplicationStatus;
}

export interface StayRejectionInfo {
    reason: string
}

export type StayRecord = Stay & Entity;