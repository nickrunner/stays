import { NextPage } from "next";

import Footer from "../../src/components/Footer";
import HostSignUp from "../../src/components/Hosts/HostSignup";
import StaysPage from "../../src/StaysPage";

const HostsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <HostSignUp />
      <Footer />
    </StaysPage>
  );
};

export default HostsPage;
