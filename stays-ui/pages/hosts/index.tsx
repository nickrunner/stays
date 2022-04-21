import { NextPage } from "next";

import Footer from "../../src/components/Footer";
import HostPortal from "../../src/components/Hosts/HostPortal";
import StaysPage from "../../src/StaysPage";

const HostPortalPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <HostPortal />
      <Footer />
    </StaysPage>
  );
};

export default HostPortalPage;
