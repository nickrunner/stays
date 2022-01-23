import { Container, ThemeProvider } from "@mui/material";
import React from "react";
import { Nav } from "../../components/AppBar/AppBar";
import Copyright from "../../components/Copyright";
import Footer from "../../components/Footer";
import UnderConstruction from "../../components/UnderConstruction";
import { theme } from "../../Theme";


function Account() {
    
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
        <Nav transparent={false} />
        <UnderConstruction />
        <Footer />
      </Container>
    </ThemeProvider>
  );
}

export default Account;
