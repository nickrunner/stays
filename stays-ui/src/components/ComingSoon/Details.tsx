import { Box, Stack, Typography } from "@mui/material";
import {content} from "../../content";

export default function Details() {
    return ( 
        <Box sx={{display: {xs: "grid", md: "flex"}, gap: 5, justifyContent:"center"}}>

            <Stack sx={{justifyContent:"center"}} >
                <Typography variant="h3" color="primary.main">
                Stays.co is a game-changer for both travelers and hosts
                </Typography>
                <br></br>
                <Typography variant="body1">
                Vacation rental hosts have become increasingly dependent on large booking platforms such as Airbnb, VRBO, etc for not only their booking management, but also for their marketing and visibility. 
                <br></br>
                <br></br>
                Stays.co allows hosts to create 'Stay Profiles' on our website that allow travelers to find them, engage with their linked social media pages, visit their private website and/or be directed to book on any existing platform the host may be listed on. 
                </Typography>
            </Stack>

            <img height="400" src={content.images.mockups.directory} alt="Directory of Stays" />
            <img height="400" src={content.images.mockups.listing} alt="Stay Listing" />

            
        </Box>
    )
}