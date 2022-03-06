import { Container, ThemeProvider } from "@mui/material";
import React from "react";

import { Nav } from "../src/components/AppBar/AppBar";
import Copyright from "../src/components/Copyright";
import Footer from "../src/components/Footer";
import UnderConstruction from "../src/components/UnderConstruction";
import { theme } from "../src/Theme";

function Account() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Nav transparent={false} />
        <UnderConstruction />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Account;
