import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import HostPortal from "../../../src/components/Portals/Hosts/HostPortal";
import MyStays from "../../../src/components/Portals/Hosts/MyStays";
import Services from "../../../src/components/Portals/Hosts/Services";
import Offers from "../../../src/components/Portals/Hosts/Stays/Offers";
import Promotions from "../../../src/components/Portals/Hosts/Stays/Promotions";
import StaysPage from "../../../src/StaysPage";

const PromotionsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Offers />
      <Footer />
    </StaysPage>
  );
};

export default PromotionsPage;
