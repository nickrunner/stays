import { Email, Facebook, Instagram, PostAdd } from "@material-ui/icons";
import { Celebration, EmailRounded, MoreTime } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { StayPromotionType } from "../../models";
import { stayPromotionContext } from "./StayPromotionContext";

export default function SelectPromotionType(props: any) {
  const { promotion } = React.useContext(stayPromotionContext);
  const [locProm, setLocProm] = React.useState(promotion);

  function setPromotionType(promotionType: StayPromotionType) {
    setLocProm({ ...locProm, type: promotionType });
    promotion.type = promotionType;
  }
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 0 }}>
        <Button
          variant="outlined"
          sx={{
            width: 150,
            height: 150,
            m: 3,
            bgcolor: locProm.type === StayPromotionType.Feed ? "action.selected" : "",
            borderWidth: locProm.type === StayPromotionType.Feed ? "3px" : "1px",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "primary.dark"
            }
          }}
          onClick={() => {
            setPromotionType(StayPromotionType.Feed);
          }}>
          <Box>
            <PostAdd fontSize="large" />
            <Typography variant="subtitle1">Feed Post</Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: 150,
            height: 150,
            m: 3,
            bgcolor: locProm.type === StayPromotionType.Story ? "action.selected" : "",
            borderWidth: locProm.type === StayPromotionType.Story ? "3px" : "1px",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "primary.dark"
            }
          }}
          onClick={() => {
            setPromotionType(StayPromotionType.Story);
          }}>
          <Box>
            <MoreTime fontSize="large" />
            <Typography variant="subtitle1">Story Post</Typography>
          </Box>
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: 150,
            height: 150,
            m: 3,
            bgcolor: locProm.type === StayPromotionType.Giveaway ? "action.selected" : "",
            borderWidth: locProm.type === StayPromotionType.Giveaway ? "3px" : "1px",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "primary.dark"
            }
          }}
          onClick={() => {
            setPromotionType(StayPromotionType.Giveaway);
          }}>
          <Box>
            <Celebration fontSize="large" />
            <Typography variant="subtitle1">Giveaway</Typography>
          </Box>
        </Button>
      </Box>
    </React.Fragment>
  );
}
