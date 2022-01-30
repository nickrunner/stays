import React, { ReactElement, ReactNode } from "react"
import { Stay } from "../../models/Stay"

export type AddStayContextType = {
    stay: Stay
}

export const addStayContext = React.createContext({} as AddStayContextType);


const defaultStay: Stay = {
    name: "",
    currentRate: 0,
    averageRate: 0,
    description: "",
    capacity: 1,
    bedrooms:1,
    type: [],
    amenities: [],
    perks: [],
    petsAllowed: false,
    onSiteParking: false,
    photos: [],
    hostEmail: "",
    enable: true,
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

export function AddStayContext({children}: {children: ReactNode }): ReactElement {
    const [stay, setStay] = React.useState<Stay>(defaultStay);
    
    return <addStayContext.Provider value={{stay}}>{children}</addStayContext.Provider>
}