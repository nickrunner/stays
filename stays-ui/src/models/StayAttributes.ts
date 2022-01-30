import { Entity } from "./Entity";

export enum StayAttributeType {
    Amenity = "amenity",
    PropertyType = "propertyType",
    SpecialInterest = "specialInterest"
}

export interface StayAttribute {
    type: StayAttributeType,
    name: string,
    description?: string,
    iconUrl?: string
}

export type StayAttributeRecord = Entity & StayAttribute;
