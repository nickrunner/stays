import { Entity } from "./Entity";
import { Social } from "./Social";
import { Booking } from "./Booking";
import { Range } from "./Range";
import { Photo } from "./Photo";
import { Location, Bounds } from "./Location";

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
    specialInterests: string[];
    amenities: string[];
    tags: string[];
    photos: Photo[];
    status: StayApplicationStatus;
    demand: string;
    social: Social[];
    booking: Booking[];
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