import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";
import Pricing from "../../components/Pricing";
import UnderConstruction from "../../components/UnderConstruction";
import { theme } from "../../Theme";
import dotMap from "../../static/img/dot_map.svg";
import { Nav } from "../../components/AppBar/AppBar";
import StaysPage from "../StaysPage";


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
