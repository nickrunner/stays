import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box, Hidden, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { globalContext } from "../../GlobalStore";
import { Role, User } from "../../models";
import { Nav } from "../AppBar/AppBar";
import Section from "../general/Section";
import Applications from "./Applications";
import MyStays from "./MyStays";
import Services from "./Services";

export interface HostPortalProps {
  user?: User;
  userId?: string;
}
export default function HostPortal(props: HostPortalProps) {
  const [tabValue, setValue] = React.useState(0);
  const { globalState } = React.useContext(globalContext);
  const router = useRouter();

  React.useEffect(() => {
    if (!globalState.isSignedIn) {
      router.push("/");
    }
    if (!globalState.self) {
      router.push("/");
    }
    if (globalState.self?.id !== props.userId) {
      router.push("/");
    }
    if (!globalState.self?.roles.includes(Role.Host)) {
      router.push("/");
    }
    return;
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <React.Fragment>
      <Nav transparent={false}>
        <Box sx={{ margin: "auto", justifyContent: "center" }}>
          <Tabs
            sx={{ margin: "auto", textTransform: "none" }}
            value={tabValue}
            onChange={handleChange}
            aria-label="icon position tabs example">
            <Tab
              sx={{ textTransform: "none" }}
              icon={<FmdBadIcon />}
              iconPosition="start"
              label={<Hidden xsDown>My Stays</Hidden>}
            />
            <Tab
              sx={{ textTransform: "none" }}
              icon={<FavoriteIcon />}
              iconPosition="start"
              label={<Hidden xsDown>Applications</Hidden>}
            />
            <Tab
              sx={{ textTransform: "none" }}
              icon={<LocalOfferIcon />}
              iconPosition="start"
              label={<Hidden xsDown>Services</Hidden>}
            />
          </Tabs>
        </Box>
      </Nav>
      <Box sx={{ mt: 25 }}>
        <Box sx={{ display: tabValue === 0 ? "flex" : "none" }}>
          <MyStays />
        </Box>
        <Box sx={{ display: tabValue === 1 ? "flex" : "none" }}>
          <Applications />
        </Box>
        <Box sx={{ display: tabValue === 2 ? "flex" : "none" }}>
          <Services />
        </Box>
      </Box>
    </React.Fragment>
  );
}
