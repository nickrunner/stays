import { Box, Typography } from "@mui/material";
import { content } from "../../content";
import ImageCarousel from "../ImageCarousel";

export default function Mockups() {

    function getImageCarouselProps(){
        const imgs = [];
        for(const mockup of content.images.mockups){
          imgs.push({
            label: mockup.description,
            imgPath: mockup.url
          });
        }
        return imgs;
      }

    return (
        <Box>
            <Typography
            variant="h1"
            align="left"
            color="common.black"
            >
                {content.pages.comingSoon.mockups}
            </Typography>
            <Box sx={{width:300, mt:5, justifyContent:"center", margin:"auto", display: {xs:"grid", md: "flex"}, gap:5}}>
                <ImageCarousel 
                    width="300" height="700" 
                    images={getImageCarouselProps()}/>
            </Box>
        </Box>
    );
}