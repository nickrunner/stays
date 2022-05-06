import { NextPage } from "next";

import AddStayPromotion from "../../../../../src/components/Portals/Hosts/Stays/Promotions/AddStayPromotion";
import StaysPage from "../../../../../src/StaysPage";

const AddStayPromotionPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <AddStayPromotion />
    </StaysPage>
  );
};

export default AddStayPromotionPage;
