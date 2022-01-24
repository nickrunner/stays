
import Footer from "../../components/Footer";
import UnderConstruction from "../../components/UnderConstruction";
import { Nav } from "../../components/AppBar/AppBar";
import StaysPage from "../StaysPage";


function HostApply() {

  return (
    
    <StaysPage>
        <Nav transparent={false} />
        <UnderConstruction />
        <Footer />
    </StaysPage>
  );
}

export default HostApply;
