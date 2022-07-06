import { NextPage } from "next";

import NewStayPromotion from "../../../../../src/components/Portals/Hosts/Stays/Promotions/NewStayPromotion";
import StaysPage from "../../../../../src/StaysPage";

const AddStayPromotionPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <NewStayPromotion />
    </StaysPage>
  );
};

export default AddStayPromotionPage;
