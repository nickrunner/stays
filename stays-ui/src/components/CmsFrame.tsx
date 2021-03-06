import ApprovalIcon from "@mui/icons-material/Approval";
import ArticleIcon from "@mui/icons-material/Article";
import CabinIcon from "@mui/icons-material/Cabin";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SkiIcon from "@mui/icons-material/DownhillSkiing";
import HotelIcon from "@mui/icons-material/Hotel";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import StoreFrontIcon from "@mui/icons-material/Storefront";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { content } from "../content";
import { globalContext } from "../GlobalStore";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: "border-box",
      ...(!open && {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
          width: theme.spacing(9)
        }
      })
    }
  })
);

export default function CmsFrame() {
  const { globalState } = React.useContext(globalContext);
  const router = useRouter();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  function logoHeight() {
    return globalState.mobile ? 50 : 65;
  }

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
      }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px" // keep right padding when drawer closed
          }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" })
            }}>
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Content Management Portal
          </Typography>

          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-center",
            px: [1]
          }}>
          <Link href={"/"}>
            <img alt="stays logo" height={logoHeight()} src={content.images.logo.purple} />
          </Link>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon sx={{ color: "primary" }} />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          <ListItemButton onClick={() => router.push("/cms/dashboard")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/content")}>
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Content" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/users")}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/stays")}>
            <ListItemIcon>
              <HotelIcon />
            </ListItemIcon>
            <ListItemText primary="Stays" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/property-types")}>
            <ListItemIcon>
              <CabinIcon />
            </ListItemIcon>
            <ListItemText primary="Property Types" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/amenities")}>
            <ListItemIcon>
              <RoomServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Amenities" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/special-interests")}>
            <ListItemIcon>
              <SkiIcon />
            </ListItemIcon>
            <ListItemText primary="Special Interests" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/host-applications")}>
            <ListItemIcon>
              <ApprovalIcon />
            </ListItemIcon>
            <ListItemText primary="Host Applications" />
          </ListItemButton>

          <ListItemButton onClick={() => router.push("/cms/promotions")}>
            <ListItemIcon>
              <StoreFrontIcon />
            </ListItemIcon>
            <ListItemText primary="Promotions" />
          </ListItemButton>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
