import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Box, Hidden, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { globalContext } from "../../GlobalStore";
import { User } from "../../models";
import { Nav } from "../AppBar/AppBar";
import Section from "../general/Section";
import Cancellations from "./Cancellations";
import EarlyBooking from "./EarlyBooking";
import Favorites from "./Favorites";
import Giveaways from "./Giveaways";
import Opportunities from "./Opportunities";

export interface TravelerPortalProps {
  user?: User;
  userId?: string;
}
export default function TravelerPortal(props: TravelerPortalProps) {
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
              label={<Hidden xsDown>Opportunities</Hidden>}
            />
            <Tab
              sx={{ textTransform: "none" }}
              icon={<FavoriteIcon />}
              iconPosition="start"
              label={<Hidden xsDown>Favorites</Hidden>}
            />
            <Tab
              sx={{ textTransform: "none" }}
              icon={<LocalOfferIcon />}
              iconPosition="start"
              label={<Hidden xsDown>Giveaways</Hidden>}
            />
            <Tab
              sx={{ textTransform: "none" }}
              icon={<CancelScheduleSendIcon />}
              iconPosition="start"
              label={<Hidden xsDown>Cancellations</Hidden>}
            />
            <Tab
              sx={{ textTransform: "none" }}
              icon={<BookmarkAddedIcon />}
              iconPosition="start"
              label={<Hidden xsDown>Early Booking</Hidden>}
            />
          </Tabs>
        </Box>
      </Nav>
      <Box sx={{ mt: 25 }}>
        <Box sx={{ display: tabValue === 0 ? "flex" : "none" }}>
          <Opportunities />
        </Box>
        <Box sx={{ display: tabValue === 1 ? "flex" : "none" }}>
          <Favorites />
        </Box>
        <Box sx={{ display: tabValue === 2 ? "flex" : "none" }}>
          <Giveaways />
        </Box>
        <Box sx={{ display: tabValue === 3 ? "flex" : "none" }}>
          <Cancellations />
        </Box>
        <Box sx={{ display: tabValue === 4 ? "flex" : "none" }}>
          <EarlyBooking />
        </Box>
      </Box>
    </React.Fragment>
  );
}