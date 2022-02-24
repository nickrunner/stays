import { Grid, Box } from "@mui/material";
import Link from "../Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import Copyright from "../Copyright";
import { content } from "../../content";
import Image from "next/image";

export default function Footer(props: any) {
    return ( 
        <Box margin="auto" sx={{display: "grid", gap:5, justifyContent:"center"}}>

        <Image 
        src={content.images.logo.purple}
        height="100"
        width="180"> 
        </Image>

        <Box sx={{display:"flex", gap:5}}  alignItems="center" justifyContent="center">
    
            <Link
                href="https://www.facebook.com/americanstays/"
                target="_blank"
            >
                <FacebookIcon
                fontSize="large"
                />
            </Link>
   
    
            <Link href="https://www.instagram.com/americanstays/?hl=en" target="_blank">
                <InstagramIcon fontSize="large" color="primary" />
            </Link>
      
        </Box>

        <Copyright/>

        </Box>
    );
}