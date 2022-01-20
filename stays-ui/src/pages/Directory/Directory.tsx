import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import Footer from "../../components/Footer";
import UnderConstruction from "../../components/UnderConstruction";
import { theme } from "../../Theme";


function Directory() {
    
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
      <Container component="main" >
        <UnderConstruction />
        < Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Directory;
