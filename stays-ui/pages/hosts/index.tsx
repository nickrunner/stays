import { Container, ThemeProvider } from "@mui/material";
import React from "react";

import { Nav } from "../../src/components/AppBar/AppBar";
import Footer from "../../src/components/Footer";
import UnderConstruction from "../../src/components/UnderConstruction";
import { theme } from "../../src/Theme";

function Hosts() {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    handleResize();
    function handleResize() {
      setMobile(window.innerWidth < 600);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

export default Hosts;
