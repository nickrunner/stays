import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import MuiToolbar from "@mui/material/Toolbar";
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { PropsWithChildren } from "react";

import { content } from "../../content";
import { globalContext } from "../../GlobalStore";
import { theme } from "../../Theme";
import SearchBar from "../general/SearchBar";
import Link from "../Link";
import LoginMenu from "./LoginMenu";
import NavButton from "./NavButton";

const Greeting = dynamic(() => import("./Greeting"), { ssr: false });

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 75,
  bgcolor: "background.default",
  [theme.breakpoints.up("sm")]: {
    height: 110
  }
}));

function AppBar(props: AppBarProps) {
  return (
    <MuiAppBar elevation={0} position="fixed" sx={{ bgcolor: "background.default" }} {...props} />
  );
}

export interface StaysAppBarProps {
  transparent: boolean;
  variant?: string;
  onSearch?: (phrase: string) => void;
}

export function Nav(props: PropsWithChildren<StaysAppBarProps>) {
  const [scroll, setScroll] = React.useState(false);
  const { globalState } = React.useContext(globalContext);
  const [show, setShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);

  function handleScroll() {
    if (typeof window !== "undefined") {
      setScroll(window.scrollY != 0);
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  }

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
    return;
  }, [lastScrollY]);

  function transparentBg() {
    return props.transparent && !scroll;
  }

  return (
    <MuiAppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        background: transparentBg() ? "transparent" : "background.default",
        display: "block"
      }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          bgcolor: transparentBg() ? "common.transparent" : "background.default",
          display: show ? "flex" : "none"
        }}>
        <Box
          sx={{
            mx: "auto",
            ml: { xs: 1, sm: 7, lg: 10 },
            flex: 1,
            display: "flex",
            justifyContent: "flex-start"
          }}>
          <Link href={"/"}>
            <Box
              sx={{
                height: { xs: 60, sm: 75 },
                display: props.variant === "search" ? { xs: "none", sm: "flex" } : "flex"
              }}>
              <img height="100%" src={content.images.logo.purple} alt="Stays Logo"></img>
            </Box>
          </Link>
        </Box>
        <Box
          sx={{
            p: 1,
            width: { xs: "75%", sm: "33%" },
            display: "flex",
            justifyContent: "center",
            mx: "auto"
          }}>
          <Box sx={{ display: props.variant != "search" ? "flex" : "none" }}>
            <NavButton transparent={props.transparent} text="Find a Stay" to="/search"></NavButton>
            <NavButton transparent={props.transparent} text="For Stayers" to="/stayers"></NavButton>
            <NavButton transparent={props.transparent} text="For Hosts" to="/hosts"></NavButton>
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              mx: "auto",
              width: "100%",
              display: props.variant === "search" ? "flex" : "none"
            }}>
            <SearchBar
              width="100%"
              height="50"
              placeholder="Search Directory"
              onSearch={(phrase: string) => {
                console.log("Search: " + phrase);
                if (props.onSearch) {
                  props.onSearch(phrase);
                }
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mx: "auto",
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            mr: { xs: 1, sm: 7, lg: 10 }
          }}>
          <Greeting transparent={props.transparent} />
          <LoginMenu height="50" />
        </Box>
      </Toolbar>
      <Box sx={{ mx: { xs: 1, sm: 7, lg: 10 }, bgcolor: "background.default" }}>
        {props.children}
      </Box>
    </MuiAppBar>
  );
}
