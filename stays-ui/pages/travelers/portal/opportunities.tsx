import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import Opportunities from "../../../src/components/Portals/Travelers/Opportunities";
import StaysPage from "../../../src/StaysPage";

const OpportunitiesPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Opportunities />
      <Footer />
    </StaysPage>
  );
};

export default OpportunitiesPage;
