import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import OrgSignUp from "../../../src/components/Portals/Hosts/OrgSignup";
import StaysPage from "../../../src/StaysPage";

const HostsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <OrgSignUp />
      <Footer />
    </StaysPage>
  );
};

export default HostsPage;
