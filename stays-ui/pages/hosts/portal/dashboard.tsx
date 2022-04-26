import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import HostPortal from "../../../src/components/Portals/Hosts/HostPortal";
import MyStays from "../../../src/components/Portals/Hosts/MyStays";
import HostDashboard from "../../../src/components/Portals/Hosts/Stays/HostDashboard";
import StaysPage from "../../../src/StaysPage";

const DashboardPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <HostDashboard />
      <Footer />
    </StaysPage>
  );
};

export default DashboardPage;
