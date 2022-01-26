import { Entity } from "./Entity";

export enum StayerMembership {
    Standard = "Standard",
    Premium = "Premium",
};

export enum HostMembersip {
    None = "None",
    Standard = "Standard",
    Silver = "Silver",
    Gold = "Gold",
    Platinum = "Platinum"
};


export enum Role {
    Stayer = "Stayer",
    Host = "Host",
    Employee = "Employee",
    Admin = "Admin"
};

export interface User {
    firstName: string;
    lastName: string;
    enabled: boolean;
    email: string;
    stayerMembership: StayerMembership;
    hostMembership: HostMembersip; 
    lastActive: number;
    roles: Role[];
};

export type UserRecord = Entity & User;