import { Entity } from "./Entity";

export interface Promotion {
    code: string,
    name: string
};

export type PromotionRecord = Entity & Promotion;