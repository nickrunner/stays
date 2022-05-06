import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import HostPortal from "../../../src/components/Portals/Hosts/HostPortal";
import MyStays from "../../../src/components/Portals/Hosts/MyStays";
import Services from "../../../src/components/Portals/Hosts/Services";
import Promotions from "../../../src/components/Portals/Hosts/Stays/Promotions/Promotions";
import StaysPage from "../../../src/StaysPage";

const PromotionsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Promotions />
      <Footer />
    </StaysPage>
  );
};

export default PromotionsPage;
