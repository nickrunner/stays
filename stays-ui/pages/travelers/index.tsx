import { NextPage } from "next";

import Footer from "../../src/components/Footer";
import TravelerPortal from "../../src/components/Travelers/TravelerPortal";
import StaysPage from "../../src/StaysPage";

const TravelerPortalPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <TravelerPortal />
      <Footer />
    </StaysPage>
  );
};

export default TravelerPortalPage;
