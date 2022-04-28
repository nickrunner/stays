import { NextPage } from "next";

import Footer from "../../../src/components/Footer";
import CancellationCalendar from "../../../src/components/Portals/Hosts/Stays/Cancellations/CancellationCalendar";
import Cancellations from "../../../src/components/Portals/Hosts/Stays/Cancellations/CancellationCalendar";
import CancellationCard from "../../../src/components/Portals/Hosts/Stays/Cancellations/CancellationsCard";
import StaysPage from "../../../src/StaysPage";

const PromotionsPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Footer />
    </StaysPage>
  );
};

export default PromotionsPage;
