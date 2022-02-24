import { Box, Stack, Typography } from "@mui/material";
import {content} from "../../content";
import Image from "next/image";

export default function Details() {
    return ( 
        <Box
        sx={{display: {xs: "grid", md: "flex"}, gap: 5, justifyContent:"center"}}>

            <Stack sx={{justifyContent:"center"}} >
                <Box>
                    <Image 
                        src={content.images.logo.purple}
                        height="100"
                        width="180"
                        alt="Stays Logo"> 
                    </Image>
                </Box>
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

            <Box>
            <Image 
                height="1500"
                width="1700" 
                src={content.images.mockups[2].url} 
                alt="Directory of Stays"> 
            </Image>
            </Box>

            
        </Box>
    )
}