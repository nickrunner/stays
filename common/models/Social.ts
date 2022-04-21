import { Entity } from "./Entity";

export interface Social {
  partner: string;
  link: string;
}

export type SocialRecord = Entity & Social;
