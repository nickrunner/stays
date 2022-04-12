import { AccountCircle, Cabin, TravelExplore } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CottageIcon from "@mui/icons-material/Cottage";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import HotelIcon from "@mui/icons-material/Hotel";
import LogoutIcon from "@mui/icons-material/Logout";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import * as React from "react";

import { AuthClient } from "../../clients/authClient";
import { globalContext } from "../../GlobalStore";
import { Role, UserMembership } from "../../models";

const menuPadding = 2;

export default function LoginMenu(props: any) {
  const router = useRouter();
  const { globalState } = React.useContext(globalContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log("Global state: ", { globalState });
    setAnchorEl(null);
  };

  async function onSignOutClick() {
    await new AuthClient().signOut();
    router.push("/sign-in");
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

  function hasMembership(tier: UserMembership): boolean {
    if (!globalState.isSignedIn) {
      return false;
    }
    if (!globalState.self) {
      return false;
    }
    if (!globalState.self.userMembership) {
      return false;
    }
    return globalState.self.userMembership == tier;
  }

  return (
    <div>
      <Button
        sx={{ height: props.height, width: { xs: 70, md: 120 }, mt: 1, p: "2px 4px" }}
        size="medium"
        variant="contained"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        margin-top="5"
        onClick={handleClick}>
        <Box sx={{ mt: { xs: 0, sm: 1 }, p: { xs: 1, sm: 0 }, display: "flex" }}>
          <MenuIcon fontSize="large" sx={{ p: 0.1 }} />
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <AccountCircle fontSize="large" sx={{ p: 0.1 }} />
          </Box>
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button"
        }}>
        <MenuItem
          onClick={() => router.push("/stayers/premium/sign-up")}
          sx={{
            width: 300,
            p: menuPadding,
            pl: 2,
            pr: 2,
            display:
              globalState.isSignedIn && !hasMembership(UserMembership.Premium) ? "flex" : "none"
          }}>
          <LoyaltyIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography variant="subtitle1">Upgrade to Premium</Typography>
        </MenuItem>

        <Divider sx={{ display: globalState.isSignedIn ? "block" : "none" }}></Divider>

        <MenuItem
          sx={{ width: 300, p: menuPadding, display: globalState.isSignedIn ? "none" : "flex" }}
          onClick={() => router.push("/sign-up")}>
          <AccountCircleIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography variant="subtitle1">Create free account</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => onSignOutClick()}
          sx={{ p: menuPadding, display: globalState.isSignedIn ? "flex" : "none" }}>
          <LogoutIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Sign out</Typography>
        </MenuItem>

        <MenuItem
          sx={{ p: menuPadding, display: globalState.isSignedIn ? "flex" : "none" }}
          onClick={() => router.push("/account")}>
          <SettingsIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Account Settings</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push("/sign-in")}
          sx={{ p: menuPadding, display: globalState.isSignedIn ? "none" : "flex" }}>
          <AccountCircle sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Sign in</Typography>
        </MenuItem>

        <Divider />

        <MenuItem
          sx={{ p: menuPadding, display: hasRole(Role.Stayer) ? "flex" : "none" }}
          onClick={() => router.push("/travelers/" + globalState.self?.id)}>
          <TravelExplore sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Traveler Portal</Typography>
        </MenuItem>

        <MenuItem
          sx={{ p: menuPadding, display: hasRole(Role.Host) ? "flex" : "none" }}
          onClick={() => router.push("/hosts/" + globalState.self?.id)}>
          <EmojiPeopleIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Host Portal</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push("/stayers")}
          sx={{ p: menuPadding, display: globalState.isSignedIn ? "none" : "flex" }}>
          <Typography>Become a member</Typography>
        </MenuItem>

        <MenuItem sx={{ p: menuPadding }} onClick={() => router.push("/directory")}>
          <HotelIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Find a stay</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push("/hosts")}
          sx={{ p: menuPadding, display: hasRole(Role.Host) ? "none" : "flex" }}>
          <CottageIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Become a host</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push("/cms/dashboard")}
          sx={{
            p: menuPadding,
            display: hasRole(Role.Admin) || hasRole(Role.Employee) ? "flex" : "none"
          }}>
          <AdminPanelSettingsIcon sx={{ color: "primary.main", mr: 1 }} />
          <Typography>Admin Portal</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
