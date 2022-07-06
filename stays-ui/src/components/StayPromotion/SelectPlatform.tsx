import { Email, Facebook, Instagram } from "@material-ui/icons";
import { EmailRounded } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

export default function SelectPlatform(props: any) {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", gap: 0 }}>
        <Button variant="outlined" sx={{ width: 150, height: 150, m: 3 }}>
          <Box>
            <Facebook fontSize="large" />
            <Typography variant="subtitle1">Facebook</Typography>
          </Box>
        </Button>
        <Button variant="outlined" sx={{ width: 150, height: 150, m: 3 }}>
          <Box>
            <Instagram fontSize="large" />
            <Typography variant="subtitle1">Instagram</Typography>
          </Box>
        </Button>
        <Button variant="outlined" sx={{ width: 150, height: 150, m: 3 }}>
          <Box>
            <EmailRounded fontSize="large" />
            <Typography variant="subtitle1">Email</Typography>
          </Box>
        </Button>
      </Box>
    </React.Fragment>
  );
}
