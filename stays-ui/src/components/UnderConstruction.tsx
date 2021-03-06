import { Box } from "@mui/material";

import { content } from "../content";

export default function UnderConstruction() {
  return (
    <Box
      sx={{
        position: "static",
        width: "100%",
        bgcolor: "background.default",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        fontSize: 25
      }}>
      <img alt="stays logo" width="40%" src={content.images.logo.purple} />
      <code>Page under construction</code>
    </Box>
  );
}
