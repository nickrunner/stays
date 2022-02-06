import { Entity } from "./Entity";

export enum StayAttributeType {
    Amenity = "Amenity",
    PropertyType = "Property Type",
    SpecialInterest = "Special Interest",
    BookingPartner = "Booking Partner",
    SocialPartner = "Social Partner"
}

export interface StayAttribute {
    type: StayAttributeType,
    name: string,
    description?: string,
    iconUrl?: string
}

export type StayAttributeRecord = Entity & StayAttribute;
