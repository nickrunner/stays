import { Box, Typography, Paper } from "@mui/material";
import { content } from "../../content";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Check, Paid, AttachMoney } from "@mui/icons-material"
import styles from "../../../styles/ComingSoon.module.css";
import PerkList from "./PerkList";

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
                >
                {content.pages.comingSoon.description.hook}
                </Typography>
                <KeyboardDoubleArrowDown sx={{align:"center", m:"auto"}} fontSize="large"/>
            </Box>

            
            <Box maxWidth="sm" margin="auto" sx={{mt:5, display:"inline-grid", justifyContent:"center"}}>
            <Typography
                variant="h4"
                align="center"
                color="primary.main"
                >
                Stays.co is a  
                <span className={styles.mycc}> free directory tool </span>
                that helps travelers find, follow and book their dream vacation rental
            </Typography>
            </Box>

            <PerkList />
            
        </Box>
    );
}