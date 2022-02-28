import { Box } from "@mui/material";
import { content } from "../../content";
import NextImageCarousel from "../ImageCarousel/NextImageCarousel";
import SectionHead from "../general/SectionHead";

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
            <SectionHead>
                {content.pages.comingSoon.mockups}
            </SectionHead> 
            <Box sx={{width:300, mt:5, justifyContent:"center", margin:"auto", display: {xs:"grid", md: "flex"}, gap:5}}>
                <NextImageCarousel 
                    width="600" height="1200" 
                    images={getImageCarouselProps()}/>
            </Box>
        </Box>
    );
}