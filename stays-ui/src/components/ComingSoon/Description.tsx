import { Box, Typography } from "@mui/material";
import { content } from "../../content";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import styles from "../../../styles/ComingSoon.module.css";


export default function(props: any){
    return (
        <Box margin="auto" sx={{display:"grid", align:"center", justifyContent: "center", gap:2}}>
            
            <Box margin="auto" sx={{display:"grid", gap:1, justifyContent: "center"}}>
                {/* <img 
                    src={content.images.logo.purple}
                    height="100"
                    width="180"> 
                </img> */}
                <Typography
                variant="h1"
                align="center"
                color={"common.black"}
                >
                {content.pages.comingSoon.description.hook}
                </Typography>
                <KeyboardDoubleArrowDown sx={{align:"center", m:"auto"}} fontSize="large"/>
            </Box>

            
            <Box  sx={{maxWidth:"sm", margin:"auto", justifyContent:"center"}}>
            
            
                <Typography
                    variant="h4"
                    align="center"
                    color="primary.main"
                    >
                    <Box sx={{p:2}}>
                        <img 
                        src={content.images.logo.purple}
                        height="100"
                        width="180"> 
                        </img>
                    </Box>
                    
                    is a  
                    <span className={styles.mycc}> free directory tool </span>
                    that helps travelers find, follow and book their dream vacation rental
                </Typography>
            </Box>
        </Box>
    );
}