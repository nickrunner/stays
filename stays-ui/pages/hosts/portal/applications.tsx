import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import Applications from "../../../src/components/Portals/Hosts/Applications";
import HostPortal from "../../../src/components/Portals/Hosts/HostPortal";
import MyStays from "../../../src/components/Portals/Hosts/MyStays";
import StaysPage from "../../../src/StaysPage";

const ApplicationsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Applications />
      <Footer />
    </StaysPage>
  );
};

export default ApplicationsPage;
