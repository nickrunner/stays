import { RoundaboutLeftRounded } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneMissedIcon from "@mui/icons-material/PhoneMissed";
import { Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { globalContext } from "../../../GlobalStore";
import { User } from "../../../models";
import { Nav } from "../../AppBar/AppBar";

export interface TravelerPortalProps {
  user?: User;
  userId?: string;
}
export default function TravelerPortal(props: TravelerPortalProps) {
  const [value, setValue] = React.useState(0);
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
        <Tabs value={value} onChange={handleChange} aria-label="icon position tabs example">
          <Tab icon={<PhoneMissedIcon />} iconPosition="start" label="Opportunities" />
          <Tab icon={<FavoriteIcon />} iconPosition="start" label="Favorites" />
          <Tab icon={<PersonPinIcon />} iconPosition="start" label="Giveaways" />
          <Tab icon={<PersonPinIcon />} iconPosition="start" label="Cancellations" />
          <Tab icon={<PersonPinIcon />} iconPosition="start" label="Early Booking" />
        </Tabs>
      </Nav>

      <Typography variant="h1">Travler Portal</Typography>
    </React.Fragment>
  );
}
