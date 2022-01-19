import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link as RouterLink} from "react-router-dom";
import Link from "@mui/material/Link"
import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';
import {ThemeProvider } from '@mui/material/styles';
import {theme} from "./Theme";
import React from 'react';

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
    color: 'common.white',
    ml: 3,
  };
  
export function Nav() {
    return (
        <ThemeProvider theme={theme}>
        <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }} />
            
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>

            <RouterLink to="sign_in">
                <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    sx={rightLink}
                    >
                    {'Sign In'}
                </Link>
            </RouterLink>
            <RouterLink to="sign_up">
                <Link
                    variant="h6"
                    underline="none"
                    sx={{ ...rightLink, color: 'secondary.main' }}>
                    {'Sign Up Test'}
                </Link>
            </RouterLink>
            </Box>
            </Toolbar>
        </AppBar>
        <Toolbar />
        </ThemeProvider>
    );
}
  
