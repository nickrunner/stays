import { ClassNames } from "@emotion/react";
import { MenuBook } from "@material-ui/icons";
import { AccountCircle, Cabin, TravelExplore } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CottageIcon from "@mui/icons-material/Cottage";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HotelIcon from "@mui/icons-material/Hotel";
import LogoutIcon from "@mui/icons-material/Logout";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
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
              justifyContent: "flex-start",
              display: { xs: "none", lg: "flex" }
            }}>
            <Box
              sx={{
                height: { xs: 50, sm: 60 }
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
              flex: 2,
              display: "inline-flex",
              justifyContent: { xs: "center", sm: "flex-end" },
              mr: { xs: 0, sm: 7, lg: 10 }
            }}>
            <IconButton
              sx={{ display: { xs: props.variant === "menu" ? "block" : "none", lg: "none" } }}
              onClick={props.onSidebarOpen}>
              <MenuIcon fontSize="large" sx={{ color: "primary.dark", p: 0.1 }} />
            </IconButton>

            <NavButton
              transparent={props.transparent}
              icon={<MenuBook />}
              text="Directory"
              to="/directory"></NavButton>
            <NavButton
              sx={{ display: hasRole(Role.Stayer) ? "none" : "block" }}
              transparent={props.transparent}
              icon={<TravelExplore />}
              text="For Travelers"
              to="/travelers/about"></NavButton>
            <NavButton
              sx={{ display: hasRole(Role.Host) ? "none" : "block" }}
              transparent={props.transparent}
              icon={<EmojiPeopleIcon />}
              text="For Hosts"
              to="/hosts/about"></NavButton>
            <NavButton
              sx={{ display: hasRole(Role.Stayer) ? "block" : "none" }}
              transparent={props.transparent}
              icon={<TravelExplore />}
              text={"Dashboard"}
              to="/travelers/portal"></NavButton>
            <NavButton
              sx={{ display: hasRole(Role.Host) ? "block" : "none" }}
              icon={<EmojiPeopleIcon />}
              transparent={props.transparent}
              text={"Hosting"}
              to="/hosts/portal"></NavButton>
            <LoginMenu height={50} />
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
