import { Box, Typography } from "@mui/material";
import { content } from "../../content";
import Image from "next/image";

export default function Partners(props:any){
    return (
        <Box sx={{display:"grid", gap:10, justifyContent:"center"}}>
            <Typography
            variant="h1"
            color="common.black"
            >
                {content.pages.comingSoon.partners}
            </Typography>
            <Box 
            sx={{
                maxWidth:"md",
                align:"center"
            }}>
                <Typography
                variant="h4"
                color="primary.main"
                >
                    Our goal is to drive traffic to your listing through expert curation, marketing, and promotion.
                </Typography>
            </Box>
            <Box sx={{ display:{xs:"grid", md:"flex", margin:"auto"}, gap:5 }}>       
                <Image 
                    src={content.images.partners.vrbo.svg}
                    height="50"
                    width="150"
                    alt="VRBO Partner Icon">
                </Image>
                <Image 
                    src={content.images.partners.airbnb.svg}
                    height="40"
                    width="150"
                    alt="Airbnb Partner Icon">
                </Image>
            
                <Image 
                    src={content.images.partners.expedia.svg}
                    height="30"
                    width="150"
                    alt="Expedia Partner Icon">
                </Image>

                <Image 
                    src={content.images.partners.bookingcom.svg}
                    height="30"
                    width="150"
                    alt="Booking.com Partner Icon">
                </Image>

            </Box> 
        </Box>
    );
}