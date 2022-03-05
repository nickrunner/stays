import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";
import React from "react";

import { content } from "../../content";
import { globalContext } from "../../GlobalStore";
import { theme } from "../../Theme";
import Link from "../Link";
import LoginMenu from "./LoginMenu";
import NavButton from "./NavButton";

const Greeting = dynamic(() => import("./Greeting"), { ssr: false });

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 75,
  [theme.breakpoints.up("sm")]: {
    height: 110
  }
}));

function AppBar(props: AppBarProps) {
  return <MuiAppBar elevation={0} position="fixed" {...props} />;
}

export interface StaysAppBarProps {
  transparent: boolean;
}

export function Nav(props: StaysAppBarProps) {
  const [scroll, setScroll] = React.useState(false);
  const { globalState, dispatch } = React.useContext(globalContext);

  React.useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY != 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function logoHeight() {
    return globalState.mobile ? 60 : 75;
  }

  function transparentBg() {
    return props.transparent && !scroll;
  }

  function getLogo() {
    return transparentBg() ? content.images.logo.white : content.images.logo.purple;
  }

  function getNavMargin() {
    return globalState.mobile ? 1 : 7;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        style={{ background: transparentBg() ? "transparent" : "background.default" }}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            bgcolor: transparentBg() ? "common.transparent" : "background.default"
          }}>
          <Box
            sx={{
              mx: "auto",
              ml: getNavMargin(),
              flex: 1,
              display: "flex",
              justifyContent: "flex-start"
            }}>
            <Link href={"/"}>
              <img alt="stays logo" height={logoHeight()} src={getLogo()} />
            </Link>
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", mx: "auto" }}>
            <NavButton transparent={props.transparent} text="Find a Stay" to="/search"></NavButton>
            <NavButton transparent={props.transparent} text="For Stayers" to="/stayers"></NavButton>
            <NavButton transparent={props.transparent} text="For Hosts" to="/hosts"></NavButton>
          </Box>

          <Box
            sx={{
              mx: "auto",
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              mr: getNavMargin()
            }}>
            <Greeting transparent={props.transparent} />
            <LoginMenu transparent={props.transparent} />
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </ThemeProvider>
  );
}
