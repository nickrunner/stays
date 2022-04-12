import { NextPage } from "next";
import { useRouter } from "next/router";

import Footer from "../../src/components/Footer";
import HostPortal from "../../src/components/Hosts/HostPortal";
import StaysPage from "../../src/StaysPage";

const HostPortalPage: NextPage = (props: any) => {
  const router = useRouter();
  const { userid } = router.query;
  return (
    <StaysPage>
      <HostPortal userId={userid as string} />
      <Footer />
    </StaysPage>
  );
};

export default HostPortalPage;
