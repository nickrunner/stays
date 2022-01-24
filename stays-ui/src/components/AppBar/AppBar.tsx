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
import whiteLogo from "../../static/img/stays_white.png"
import { useNavigate } from "react-router-dom";
import LoginMenu from './LoginMenu';
import NavButton  from "./NavButton";
import { UserClient } from '../../clients/userClient';
import { User } from '../../models/User';
import { globalContext } from '../../GlobalStore';
 
const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up('sm')]: {
    height: 70,
  },
}));

function AppBar(props: AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export interface StaysAppBarProps {
  transparent: boolean
}
  
export function Nav(props: StaysAppBarProps) {
  let navigate = useNavigate();
  const [scroll, setScroll] = React.useState(false);
  const { globalState, dispatch } = React.useContext(globalContext);

  React.useEffect(() => {

    function handleScroll(){
      setScroll(window.scrollY != 0 );
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  function logoHeight() {
    return globalState.mobile ? 60 : 75;
  }

  function transparentBg(){
    return  props.transparent && (!scroll);
  }

  function getLogo() {
    return transparentBg() ? whiteLogo : logo;
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
                <img height={logoHeight()}  src={getLogo()} />
              </RouterLink>
              
            </Box>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: "center", mx:"auto"}}>
              <NavButton transparent={props.transparent} text="Find a Stay" to="/search"></NavButton>
              <NavButton transparent={props.transparent} text="For Stayers" to="/stayers"></NavButton>
              <NavButton transparent={props.transparent} text="For Hosts" to="/hosts"></NavButton>  
            </Box>

            <Box sx={{mx:"auto", flex: 1, display: 'flex', justifyContent: "flex-end" }}>
            <Box
              style={{display: globalState.isSignedIn ? 'block' : 'none'}}
              >
              <NavButton transparent={props.transparent} text={"Welcome "+globalState.self?.firstName+" !"} to="/account"></NavButton>  
            </Box>
               <LoginMenu transparent={props.transparent}/>
            </Box>

            
            </Toolbar>
        </AppBar>
        <Toolbar />
        </ThemeProvider>
    );
}
  

