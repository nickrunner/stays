import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import HostPortal from "../../../src/components/Portals/Hosts/HostPortal";
import MyStays from "../../../src/components/Portals/Hosts/MyStays";
import Services from "../../../src/components/Portals/Hosts/Services";
import StaysPage from "../../../src/StaysPage";

const ServicesPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Services />
      <Footer />
    </StaysPage>
  );
};

export default ServicesPage;