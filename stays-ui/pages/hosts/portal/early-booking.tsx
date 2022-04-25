import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import EarlyBooking from "../../../src/components/Portals/Hosts/Stays/EarlyBooking";
import StaysPage from "../../../src/StaysPage";

const PromotionsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <EarlyBooking />
      <Footer />
    </StaysPage>
  );
};

export default PromotionsPage;
