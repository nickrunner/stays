import { Nav } from '../../src/components/AppBar/AppBar';
import Footer from '../../src/components/Footer';
import UnderConstruction from '../../src/components/UnderConstruction';
import StaysPage from '../../src/StaysPage';

function PremiumSignUp() {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <UnderConstruction />
      <Footer />
    </StaysPage>
  );
}

export default PremiumSignUp;
