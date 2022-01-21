import { Box, Button, Container, Grid, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';
import Image from 'material-ui-image'
import scribners from "../../static/img/scribners.jpg";
import aframe from "../../static/img/aframe.jpg";
import aBed from "../../static/img/aframe-bed.jpg";
import logo from "../../static/img/stays_purple.png";
import dotMap from "../../static/img/dot_map.svg"
import { useNavigate } from "react-router-dom";
import "./Hero.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Nav } from '../../components/AppBar/AppBar';
import Jumbotron from "../../components/Jumbotron";
import {Search, Loyalty, BookOnline} from "@mui/icons-material";

const backgroundImage = {scribners}

export default function Description(props: any) {
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

  const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };
  
  const number = {
    fontSize: 24,
    fontFamily: 'default',
    color: 'primary.dark',
    fontWeight: 'bold',
  };
  
  const image = {
    height: 55,
    my: 4,
  };
  

  return (
    <Box
      component="section"
      sx={{ mt:20, display: 'flex', bgcolor: 'background.default', overflow: 'hidden' }}
    >
      <Container
        sx={{
          mt: 5,
          mb: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src={dotMap}
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            width: "100%",
            top: 0,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" align="center" component="h2" sx={{ mb: 2 }}>
          How it works
        </Typography>
        <KeyboardDoubleArrowDownIcon fontSize="large" sx={{ mb: 2 }}/>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Search sx={{p:3, fontSize:55}}/>
                <Typography variant="h5" align="center">
                  Browse our expert curated collection of unique vacation rentals.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
              <Loyalty sx={{p:3, fontSize:55}}/>
                <Typography variant="h5" align="center">
                  Become a member and get notified of vacancies before anyone else.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
              <BookOnline sx={{p:3, fontSize:55}}/>
                <Typography variant="h5" align="center">
                  Book directly with the source.  By cutting out the middle-man, you save on your booking cost.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="primary"
          size="large"
          variant="contained"
          component="a"
          href="/premium-themes/onepirate/sign-up/"
          sx={{ mt: 5 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
   
  );
}