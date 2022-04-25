import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import Cancellations from "../../../src/components/Portals/Hosts/Stays/Cancellations";
import StaysPage from "../../../src/StaysPage";

const PromotionsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Cancellations />
      <Footer />
    </StaysPage>
  );
};

export default PromotionsPage;
