import { Entity } from "./Entity";

export enum Membership {
    Standard = "Standard",
    Premium = "Premium",
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
    email: string;
    membership: Membership;
    roles: Role[];
};

export type UserRecord = Entity & User;