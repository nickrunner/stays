import { Entity } from "./Entity";

export enum StayPromotionType {
  Post = "Post",
  Giveaway = "Giveaway",
  Email = "Email",
  Story = "Story",
}

export enum SocialPlatform {
  Instagram = "Instagram",
  Facebook = "Facebook",
  Tiktok = "Tik-Tok",
  None = "none",
}

export enum StayPromotionStatus {
  Requested = "Requested",
  Scheduled = "Scheduled",
  Executed = "Executed",
  Closed = "Closed",
}

export enum PromotionMediaType {
  Photo = "Photo",
  Video = "Video",
}

export interface PromotionMedia {
  url: string;
  type: PromotionMediaType;
}

export interface PromotionTags {
  accounts?: string[];
  locations?: string[];
}

export interface StayPromotion {
  stayId: string;
  type: StayPromotionType;
  socialPlatform: SocialPlatform;
  status: StayPromotionStatus;
  media: PromotionMedia[];
  bookingLink: string;
  startDate: number;
  summary: string;
  details?: string;
  tags?: PromotionTags;
}

export interface Giveaway extends StayPromotion {
  nights: number;
  endDate: number;
  winner: string;
}

export type StayPromotionRecord = Entity & StayPromotion;
