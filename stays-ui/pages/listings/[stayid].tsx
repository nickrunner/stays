import { NextPage } from "next";
import { useRouter } from "next/router";

import Footer from "../../src/components/Footer";
import Listing from "../../src/components/Listing/Listing";
import StaysPage from "../../src/StaysPage";

const ListingPage: NextPage = (props: any) => {
  const router = useRouter();
  const { stayid } = router.query;
  return (
    <StaysPage>
      <Listing stayId={stayid as string} />
      <Footer />
    </StaysPage>
  );
};

export default ListingPage;
