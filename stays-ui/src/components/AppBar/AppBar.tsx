import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link"
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import {ThemeProvider } from '@mui/material/styles';
import {theme} from "../../Theme";
import React from 'react';
import { Button, Typography } from '@mui/material';
import logo from "../../static/img/stays_purple.png"
import { useNavigate } from "react-router-dom";
import LoginMenu from './LoginMenu';

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


  let navigate = useNavigate();
  React.useEffect(() => {

  }, []);

    return (
        <ThemeProvider theme={theme}>
        <AppBar position="fixed">
            <Toolbar sx={{ 
              bgcolor: "background.default",
              justifyContent: 'space-between',
              }}>
            <Box  sx={{flex: 1, display: 'flex', justifyContent: 'flex-end' }} >
              <RouterLink to="/"><img height="60"  src={logo} /></RouterLink>
            </Box>
            <Box mr={35} sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <LoginMenu />
            </Box>
            
            </Toolbar>
        </AppBar>
        <Toolbar />
        </ThemeProvider>
    );
}
  

