import { ClassNames } from "@emotion/react";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Menu } from "@mui/material";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import MuiToolbar from "@mui/material/Toolbar";
import { makeStyles, styled } from "@mui/styles";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

import { content } from "../../content";
import { globalContext } from "../../GlobalStore";
import { Role } from "../../models";
import { theme } from "../../Theme";
import SearchBar from "../general/SearchBar";
import Link from "../Link";
import LoginMenu from "./LoginMenu";
import NavButton from "./NavButton";
import NavTab from "./NavTab";

const Greeting = dynamic(() => import("./Greeting"), { ssr: false });

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  show: {
    display: "flex"
  },
  hide: {
    display: "none"
  }
}));

const Toolbar = styled(MuiToolbar)(() => ({
  height: 75,
  bgcolor: "background.default",
  [theme.breakpoints.up("sm")]: {
    height: 80
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
  hideOnScroll?: boolean;
  onSearch?: (phrase: string) => void;
  onSidebarOpen?: () => void;
}

export function Nav(props: PropsWithChildren<StaysAppBarProps>) {
  const [scroll, setScroll] = React.useState(false);
  const { globalState } = React.useContext(globalContext);
  const [show, setShow] = React.useState(true);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const router = useRouter();

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

  function searchDirectory(phrase: string) {
    if (typeof window !== "undefined") {
      if (phrase) {
        router.push({
          pathname: "/directory",
          query: { search: phrase }
        });
      } else {
        router.push("/directory");
      }
    }
  }

  function hasRole(role: Role): boolean {
    if (!globalState.isSignedIn) {
      return false;
    }
    if (!globalState.self) {
      return false;
    }
    if (!globalState.self.roles) {
      return false;
    }
    return globalState.self.roles.includes(role);
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
  const classes = useStyles();
  return (
    <React.Fragment>
      <MuiAppBar
        position="fixed"
        elevation={transparentBg() ? 0 : 10}
        sx={{
          bgcolor: "background.default",
          background: transparentBg() ? "transparent" : "background.default"
        }}>
        <Toolbar
          className={show || !props.hideOnScroll ? classes.show : classes.hide}
          sx={{
            justifyContent: "space-between",
            bgcolor: transparentBg() ? "common.transparent" : "background.default"
          }}>
          <Box
            sx={{
              mx: "auto",
              ml: { xs: 1, sm: 7, lg: 10 },
              display: "flex",
              justifyContent: "flex-start"
            }}>
            <Box>
              <IconButton
                onClick={props.onSidebarOpen}
                sx={{
                  display: {
                    xs: "inline-flex",
                    lg: "none"
                  }
                }}>
                <MenuIcon fontSize="small" sx={{ p: 0.1 }} />
              </IconButton>
            </Box>
            <Box
              sx={{
                height: { xs: 50, sm: 60 },
                display: props.variant === "search" ? { xs: "none", sm: "flex" } : "flex"
              }}>
              <Link href={"/"}>
                <img
                  height="100%"
                  src={transparentBg() ? content.images.logo.white : content.images.logo.purple}
                  alt="Stays Logo"></img>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: props.variant === "search" ? "flex" : "none", sm: "flex" },
              p: 1,
              mx: { xs: 1, sm: 3, lg: 10 },
              flex: 2,
              justifyContent: "flex-center"
            }}>
            <SearchBar
              width="70%"
              height="60"
              placeholder="Search stays.co"
              onSearch={(phrase: string) => {
                console.log("Search: " + phrase);
                searchDirectory(phrase);
              }}
            />
          </Box>
          {/* <Box>
            <Greeting transparent={props.transparent}></Greeting>
          </Box> */}

          <Box
            sx={{
              mx: "auto",
              flex: 3,
              display: "flex",
              justifyContent: "flex-end",
              mr: { xs: 1, sm: 7, lg: 10 },
              maxWidth: "md"
            }}>
            {/* <Greeting transparent={props.transparent} /> */}
            <NavButton
              transparent={props.transparent}
              text="Find a Stay"
              to="/directory"></NavButton>
            <NavButton
              sx={{ display: { xs: "none", sm: hasRole(Role.Stayer) ? "none" : "block" } }}
              transparent={props.transparent}
              text="For Travelers"
              to="/travelers/about"></NavButton>
            <NavButton
              sx={{ display: { xs: "none", sm: hasRole(Role.Host) ? "none" : "block" } }}
              transparent={props.transparent}
              text="For Hosts"
              to="/hosts/about"></NavButton>
            <NavButton
              sx={{ display: { xs: "none", sm: hasRole(Role.Stayer) ? "block" : "none" } }}
              transparent={props.transparent}
              text={"Dashboard"}
              to="/travelers/portal"></NavButton>
            <NavButton
              sx={{ display: { xs: "none", sm: hasRole(Role.Host) ? "block" : "none" } }}
              transparent={props.transparent}
              text={"Hosting"}
              to="/hosts/portal"></NavButton>
            <LoginMenu height="50" />
          </Box>
        </Toolbar>
        <Box
          className={classes.show}
          sx={{ mx: { xs: 1, sm: 7, lg: 10 }, bgcolor: "background.default" }}>
          {props.children}
        </Box>
      </MuiAppBar>
    </React.Fragment>
  );
}
