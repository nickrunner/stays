import { Email, Facebook, Instagram, PostAdd } from "@material-ui/icons";
import { Celebration, EmailRounded, MoreTime } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function SelectPromotionType(props: any) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 0 }}>
        <Button variant="outlined" sx={{ width: 150, height: 150, m: 3 }}>
          <Box>
            <PostAdd fontSize="large" />
            <Typography variant="subtitle1">Feed Post</Typography>
          </Box>
        </Button>
        <Button variant="outlined" sx={{ width: 150, height: 150, m: 3 }}>
          <Box>
            <MoreTime fontSize="large" />
            <Typography variant="subtitle1">Story Post</Typography>
          </Box>
        </Button>
        <Button variant="outlined" sx={{ width: 150, height: 150, m: 3 }}>
          <Box>
            <Celebration fontSize="large" />
            <Typography variant="subtitle1">Giveaway</Typography>
          </Box>
        </Button>
      </Box>
    </React.Fragment>
  );
}
