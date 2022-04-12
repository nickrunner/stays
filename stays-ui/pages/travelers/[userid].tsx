import { NextPage } from "next";
import { useRouter } from "next/router";

import Footer from "../../src/components/Footer";
import Listing from "../../src/components/Listing/Listing";
import TravelerPortal from "../../src/components/Travelers/TravelerPortal";
import StaysPage from "../../src/StaysPage";

const TravelerPortalPage: NextPage = (props: any) => {
  const router = useRouter();
  const { userid } = router.query;
  return (
    <StaysPage>
      <TravelerPortal userId={userid as string} />
      <Footer />
    </StaysPage>
  );
};

export default TravelerPortalPage;