import { NextPage } from "next";
import dynamic from "next/dynamic";

import Footer from "../../../src/components/Footer";
import StaysPage from "../../../src/StaysPage";

const HostPortal = dynamic(() => import("../../../src/components/Portals/Hosts/HostPortal"), {
  ssr: false
});

const HostPortalPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <HostPortal />
      <Footer />
    </StaysPage>
  );
};

export default HostPortalPage;
