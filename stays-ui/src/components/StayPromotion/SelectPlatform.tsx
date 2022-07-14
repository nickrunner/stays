import { Email, Facebook, Instagram } from "@material-ui/icons";
import { EmailRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { SocialPlatform } from "../../models";
import { stayPromotionContext } from "./StayPromotionContext";

export default function SelectPlatform(props: any) {
  const { promotion } = React.useContext(stayPromotionContext);
  const [locProm, setLocProm] = React.useState(promotion);

  function setPlatform(platform: SocialPlatform) {
    setLocProm({ ...locProm, socialPlatform: platform });
    promotion.socialPlatform = platform;
  }

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 0 }}>
        <Button
          variant="outlined"
          onClick={() => {
            setPlatform(SocialPlatform.Facebook);
          }}
          sx={{
            width: 150,
            height: 150,
            m: 3,
            bgcolor: locProm.socialPlatform === SocialPlatform.Facebook ? "action.selected" : "",
            borderWidth: locProm.socialPlatform === SocialPlatform.Facebook ? "3px" : "1px",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "primary.dark"
            }
          }}>
          <Box>
            <Facebook fontSize="large" />
            <Typography variant="subtitle1">Facebook</Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setPlatform(SocialPlatform.Instagram);
          }}
          sx={{
            width: 150,
            height: 150,
            m: 3,
            bgcolor: locProm.socialPlatform === SocialPlatform.Instagram ? "action.selected" : "",
            borderWidth: locProm.socialPlatform === SocialPlatform.Instagram ? "3px" : "1px",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "primary.dark"
            }
          }}>
          <Box>
            <Instagram fontSize="large" />
            <Typography variant="subtitle1">Instagram</Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setPlatform(SocialPlatform.None);
          }}
          sx={{
            width: 150,
            height: 150,
            m: 3,
            bgcolor: locProm.socialPlatform === SocialPlatform.None ? "action.selected" : "",
            borderWidth: locProm.socialPlatform === SocialPlatform.None ? "3px" : "1px",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "primary.dark"
            }
          }}>
          <Box>
            <EmailRounded fontSize="large" />
            <Typography variant="subtitle1">Email</Typography>
          </Box>
        </Button>
      </Box>
    </React.Fragment>
  );
}
