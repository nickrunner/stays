import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import HostPortal from "../../../src/components/Portals/Hosts/HostPortal";
import MyStays from "../../../src/components/Portals/Hosts/MyStays";
import StaysPage from "../../../src/StaysPage";

const MyStaysPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Footer />
    </StaysPage>
  );
};

export default MyStaysPage;
