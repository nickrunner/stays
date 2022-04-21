import { Entity } from "./Entity";

export interface Org {
  name: string;
  userIds: string[];
  stayIds: string[];
}

export type OrgRecord = Entity & Org;
