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

function Home() {
  return (

    <ThemeProvider theme={theme}>
        <Nav transparent={true} />
        <Hero />
        <Description />
        <Showcase />
        <Help />
        <Footer />
    </ThemeProvider>
  );
}

export default Home;
