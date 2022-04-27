import { HorizontalSplitSharp } from "@mui/icons-material";
import { NextPage } from "next";

import Footer from "../../src/components/Footer";
import Hosts from "../../src/components/Portals/Hosts/AboutHosting";
import Travelers from "../../src/components/Portals/Travelers/Travelers";
import StaysPage from "../../src/StaysPage";

const HostsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Hosts />
      <Footer />
    </StaysPage>
  );
};

export default HostsPage;