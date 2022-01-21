import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";
import Pricing from "../../components/Pricing";
import UnderConstruction from "../../components/UnderConstruction";
import { theme } from "../../Theme";
import dotMap from "../../static/img/dot_map.svg";
import { Nav } from "../../components/AppBar/AppBar";


function Stayers() {
    
    const [mobile, setMobile] = React.useState(false);
    React.useEffect(() => {
        handleResize();
        function handleResize() {
        setMobile(window.innerWidth < 600);
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    }, []);
    
  return (
    
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Nav transparent={false} />
        <Pricing />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Stayers;
