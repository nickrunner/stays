import Hero from "./Hero";
import { Nav } from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer";
import Help from "./Help";
import Description from "./Description";
import Showcase from "./Showcase";
import StaysPage from "../StaysPage";

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
