import { Box } from "@mui/material";
import { content } from "../../content";

export default function Partners(props:any){
    return (
        <Box sx={{display:"flex", gap:2 }}>       
            <img 
            src={content.images.partners.vrbo.icon}
            height="30">
            </img>
            <img 
            src={content.images.partners.airbnb.icon}
            height="30">
            </img>
            <img 
            src={content.images.partners.hipcamp.icon}
            height="30">
            </img>
        </Box> 
    );
}