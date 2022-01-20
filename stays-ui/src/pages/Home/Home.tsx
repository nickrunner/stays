import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";
import scribners from "../../static/img/scribners.jpg";
import Hero from "./Hero";
import { Nav } from "../../components/AppBar/AppBar";
import SubHero from "./SubHero";
import Footer from "../../components/Footer";

function Home() {
  return (

    <ThemeProvider theme={theme}>
        <Hero />
    </ThemeProvider>
  );
}

export default Home;
