import { Nav } from "../../src/components/AppBar/AppBar";
import Footer from "../../src/components/Footer";
import UnderConstruction from "../../src/components/UnderConstruction";
import StaysPage from "../../src/StaysPage";

function HostPortal() {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <UnderConstruction />
      <Footer />
    </StaysPage>
  );
}

export default HostPortal;
