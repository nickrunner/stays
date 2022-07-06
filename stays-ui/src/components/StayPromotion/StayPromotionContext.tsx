import React, { ReactElement, ReactNode } from "react";

import {
  SocialPlatform,
  StayPromotion,
  StayPromotionStatus,
  StayPromotionType
} from "../../models";

export type StayPromotionContextType = {
  promotion: StayPromotion;
};

export const stayPromotionContext = React.createContext({} as StayPromotionContextType);

const defaultPromotion: StayPromotion = {
  stayId: "",
  type: StayPromotionType.Feed,
  socialPlatform: SocialPlatform.None,
  status: StayPromotionStatus.Requested,
  media: [],
  bookingLink: "",
  startDate: 0,
  summary: ""
};

export function StayPromotionContext({ children }: { children: ReactNode }): ReactElement {
  const [promotion, setPromotion] = React.useState<StayPromotion>(defaultPromotion);

  return (
    <stayPromotionContext.Provider value={{ promotion }}>{children}</stayPromotionContext.Provider>
  );
}
