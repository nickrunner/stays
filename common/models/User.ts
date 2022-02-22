import { Entity } from "./Entity";
import { Range } from "./Range";

export enum UserMembership {
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
    enabled: boolean;
    email: string;
    userMembership: UserMembership;
    lastActive: number;
    roles: Role[];
};

export interface UserSearchFilter {
    firstName?: string;
    lastName?: string;
    enabled?: boolean;
    email?: string;
    userMembership?: UserMembership;
    lastActive?: Range;
    roles?: Role[];

};

export type UserRecord = Entity & User;