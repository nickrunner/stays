import { Entity } from "./Entity";
import {Range} from "./Range";


export interface Stay {
    name: string;
    description: string;
    city: string,
    state: string,
    region: string,
    avgRate: Range;
    capacity: Range;
    bedrooms: number;
    petsAllowed: boolean;
    onSiteParking: boolean;
    hostId: string;
    type?: string[];
    perks?: string[];
    amenities?: string[];
    photoUrls: string[];
};

export type StayRecord = Stay & Entity;