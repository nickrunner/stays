import { Nav } from '../../src/components/AppBar/AppBar';
import Footer from '../../src/components/Footer';
import Pricing from '../../src/components/Pricing';
import StaysPage from '../../src/StaysPage';

function Stayers() {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <Pricing />
      <Footer />
    </StaysPage>
  );
}

export default Stayers;
