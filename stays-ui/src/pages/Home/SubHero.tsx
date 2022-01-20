import { Box, Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import Image from 'material-ui-image'
import scribners from "../../static/img/scribners.jpg";
import aframe from "../../static/img/aframe.jpg";
import aBed from "../../static/img/aframe-bed.jpg";
import dotMap from "../../static/img/dot_map.svg"
import { useNavigate } from "react-router-dom";
import "./Hero.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Nav } from '../../components/AppBar/AppBar';
import Jumbotron from "../../components/Jumbotron";

const backgroundImage = {scribners}

export default function SubHero(props: any) {
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
      component="section"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 9 }}
    >
      <Button
        sx={{
          border: '4px solid currentColor',
          borderRadius: 0,
          height: 'auto',
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span">
          Got any questions? Need help?
        </Typography>
      </Button>
      <Typography variant="subtitle1" sx={{ my: 3 }}>
        We are here to help. Get in touch!
      </Typography>
      <Box
        component="img"
        src={dotMap}
        alt="buoy"
        sx={{ width: 60 }}
      />
    </Container>
   
  );
}