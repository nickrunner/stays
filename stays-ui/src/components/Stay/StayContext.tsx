import React, { ReactElement, ReactNode } from "react"
import { Stay, StayApplicationStatus } from "../../../../common/models/Stay";

export type StayContextType = {
    stay: Stay
}

export const stayContext = React.createContext({} as StayContextType);


const defaultStay: Stay = {
    name: "",
    currentRate: 0,
    averageRate: 0,
    description: "",
    capacity: 1,
    bedrooms:1,
    type: [],
    amenities: [],
    specialInterests: [],
    tags: [],
    petsAllowed: false,
    onSiteParking: false,
    photos: [],
    hostEmail: "",
    enable: true,
    status: StayApplicationStatus.Pending,
    social: [],
    booking: [],
    demand: "",
    location: {
        address: {
            city: "",
            state: "",
            zip: 0,
            address1:"",
            address2:"",
            country: ""
        },
        region: "",
        coordinates: {
            latitude: 0,
            longitude: 0
        }
    },
}

export function StayContext({children}: {children: ReactNode }): ReactElement {
    const [stay, setStay] = React.useState<Stay>(defaultStay);
    
    return <stayContext.Provider value={{stay}}>{children}</stayContext.Provider>
}