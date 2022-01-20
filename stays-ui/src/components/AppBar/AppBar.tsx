import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link"
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import {ThemeProvider } from '@mui/material/styles';
import {theme} from "../../Theme";
import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import logo from "../../static/img/stays_purple.png"
import { useNavigate } from "react-router-dom";
import LoginMenu from './LoginMenu';
import NavButton  from "./NavButton";
 
const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));

function AppBar(props: AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

const rightLink = {
    fontSize: 16,
    color: 'primary',
    ml: 3,
    underline: "none"
  };
  
export function Nav() {

  const [mobile, setMobile] = React.useState(false);
  const [scroll, setScroll] = React.useState(false);
  React.useEffect(() => {
    handleResize();
    function handleResize() {
      setMobile(window.innerWidth < 600);
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', () => {setScroll(true)});
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  function logoHeight() {
    return mobile ? 60 : 75;
  }

  function transparentBg(){
    return  mobile && (!scroll);
  }

    return (
        <ThemeProvider theme={theme}>
        <AppBar position="fixed" 
        style={{background:(transparentBg() ? "transparent" : "background.default")}}
        >
            <Toolbar sx={{ 
              justifyContent: 'space-between',
              bgcolor: (transparentBg() ? "common.transparent" : "background.default")
              }}>
            <Box  sx={{mx:"auto", flex: 1, display: 'flex', justifyContent: 'flex-start' }} >
              <RouterLink to="/">
                <img height={logoHeight()}  src={logo} />
              </RouterLink>
              
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: "center", mx:"auto"}}>
              <NavButton text="Find a Stay" to="/search"></NavButton>
              <NavButton text="For Stayers" to="/stayers"></NavButton>
              <NavButton text="For Hosts" to="/hosts"></NavButton>  
            </Box>

            <Box sx={{mx:"auto", flex: 1, display: 'flex', justifyContent: "flex-end" }}>
               <LoginMenu />
            </Box>

            
            </Toolbar>
        </AppBar>
        <Toolbar />
        </ThemeProvider>
    );
}
  

