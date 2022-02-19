import { Box, Typography, Grid } from "@mui/material";
import { content } from "../../content";

export default function Perks() {
    return (
        <Box>
            <Typography
            variant="h2"
            align="center"
            color="primary.main"
            >
                Stays.co has a ton of perks for our traveler and rental host members
            </Typography>
            <Box sx={{mt:10, justifyContent:"center", display: {xs:"grid", md: "flex"}, gap:5}}>
                <img height="500" src={content.images.mockups.travelerPerks} alt="Traveler Perks" />
                <img height="500" src={content.images.mockups.hostPerks} alt="Host Perks" />
            </Box>
        </Box>
    );
}