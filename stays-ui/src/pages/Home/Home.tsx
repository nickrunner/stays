import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";
import scribners from "../../static/img/scribners.jpg";
import Hero from "./Hero";
import { Nav } from "../../components/AppBar/AppBar";
import StayersHero from "./Description";
import Footer from "../../components/Footer";
import HostsHero from "./Help";
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
