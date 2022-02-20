import { Box, Stack, Typography } from "@mui/material";
import {content} from "../../content";

export default function Details() {
    return ( 
        <Box
        maxWidth="md" 
        sx={{display: {xs: "grid", md: "flex"}, gap: 5, justifyContent:"center"}}>

            <Stack sx={{justifyContent:"center"}} >
                <Typography variant="h3" color="primary.main">
                {content.pages.comingSoon.details.header}
                </Typography>
                <br></br>
                <Typography variant="body1">
                {content.pages.comingSoon.details.sub1}
                <br></br>
                <br></br>
                {content.pages.comingSoon.details.sub2}
                </Typography>
            </Stack>

            <img height="300" src={content.images.mockups.doubles1} alt="Directory of Stays" />
            {/* <img height="400" src={content.images.mockups.listing} alt="Stay Listing" /> */}

            
        </Box>
    )
}