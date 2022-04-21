import { NextPage } from "next";

import Footer from "../../src/components/Footer";
import Travelers from "../../src/components/Travelers/Travelers";
import StaysPage from "../../src/StaysPage";

const TravelersPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Travelers />
      <Footer />
    </StaysPage>
  );
};

export default TravelersPage;
