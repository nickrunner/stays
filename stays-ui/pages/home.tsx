import { Nav } from "../src/components/AppBar/AppBar";
import Footer from "../src/components/Footer";
import Description from "../src/components/Home/Description";
import Help from "../src/components/Home/Help";
import Hero from "../src/components/Home/Hero";
import Showcase from "../src/components/Home/Showcase";
import StaysPage from "../src/StaysPage";

function Home() {
  return (
    <StaysPage>
      <Nav transparent={true} />
      <Hero />
      <Description />
      <Showcase />
      <Help />
      <Footer />
    </StaysPage>
  );
}

export default Home;
