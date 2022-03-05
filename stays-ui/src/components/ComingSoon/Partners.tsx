import { Box, Typography } from "@mui/material";

import AirbnbLogo from "../../logos/AirbnbLogo";
import LodgifyLogo from "../../logos/LodgifyLogo";
import VrboLogo from "../../logos/VrboLogo";

export default function Partners() {
  return (
    <Box sx={{ display: "grid" }}>
      <Box
        sx={{
          display: { xs: "flex" }
        }}>
        <Box sx={{ p: { xs: 1.5, sm: 3 }, margin: "auto" }}>
          <AirbnbLogo color="#78756c" />
        </Box>

        <Box sx={{ p: { xs: 1.5, sm: 3 }, margin: "auto" }}>
          <VrboLogo color="#78756c" />
        </Box>

        <Box sx={{ p: { xs: 1.5, sm: 3 }, margin: "auto", display: { xs: "none", sm: "block" } }}>
          <LodgifyLogo color="#78756c" />
        </Box>
      </Box>

      <Box sx={{ p: { xs: 1.5, sm: 3 }, margin: "auto", display: { xs: "block", sm: "none" } }}>
        <LodgifyLogo color="#78756c" />
      </Box>

      <Typography sx={{ p: { xs: 1.5, sm: 3 }, margin: "auto" }} variant="caption">
        ... and other top platforms
      </Typography>
    </Box>
  );
}
