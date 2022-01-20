import { Box } from "@mui/material";
import stays_purple from "../static/img/stays_purple.png";
import Copyright from "./Copyright";

export default function UnderConstruction() {
  return (
    <Box
        sx={{
        position: 'static',
        width:"100%",
        bgcolor: 'background.default',
        justifyContent: "center",
        alignItems:"center",
        display:"flex",
        flexDirection:"column",
        fontSize: 25,
    }}>
        <img width="40%" src={stays_purple} />
        <code>Page under construction</code>
    </Box>
  );
}

