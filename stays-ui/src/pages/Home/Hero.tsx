import { Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import Image from 'material-ui-image'
import scribners from "../../static/img/scribners.jpg";
import aframe from "../../static/img/aframe.jpg";
import aBed from "../../static/img/aframe-bed.jpg";
import { useNavigate } from "react-router-dom";
import "./Hero.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Nav } from '../../components/AppBar/AppBar';
import Jumbotron from '../../components/Jumbotron';
import Pricing from '../../components/Pricing';

const backgroundImage = {scribners}

export default function Hero(props: any) {
  let navigate = useNavigate();
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    handleResize();
    function handleResize() {
      setMobile(window.innerWidth < 600);
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return (  
    <Container
    sx={{
      mt: 3,
      mb: 14,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: -1,
      width: "100%",
      height: "1"
    }}
  > 
      <Jumbotron backgroundImage={aBed}>
          </Jumbotron>

        <Typography align="center" variant={mobile ? "h3" : "h2"} sx={{ mb: 4, mt: { sx: 5, sm: 15 } }}>
            Book directly with elite vacation rentals
        </Typography>
        <Typography
            color="inherit"
            align="center"
            variant={mobile ? "h5" : "h4"}
            sx={{ mb: 10, mt: { sx: 4, sm: 10 } }}
        >
            Stay in luxury.  Save money. 
        </Typography>
        <Button
            color="primary"
            variant="contained"
            size="large"
            component="a"
            onClick={() => navigate("/search")}
            sx={{ minWidth: 200 }}
        >
            Find your stay
        </Button>

        <Box
          height="16"
          width="12"
          sx={{ position: 'absolute', bottom: 32 }}
        >
        </Box>
    </Container>
     
  );
}