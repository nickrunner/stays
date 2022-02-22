import { Box, Typography, Paper } from "@mui/material";
import { content } from "../../content";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Check, Paid, AttachMoney } from "@mui/icons-material"
import styles from "../../../styles/ComingSoon.module.css";
import Perk from "./Perk";
import CottageIcon from '@mui/icons-material/Cottage';
import Partners from "./Partners";

export default function PerkList (props: any)  {
    return (
        <Box maxWidth="sm" margin="auto" sx={{mt:5, justifyContent:"center"}}>
                <Paper sx={{
                    p:5, 
                    justifyContent:"center", 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}>

                
                <Partners />

                <Typography
                    sx={{p:3}}
                    variant="subtitle1"
                    align="center"
                    color="common.black"
                    >
                    {content.pages.comingSoon.description.sinker}
                </Typography>

                
                
                <Box sx={{align:"center"}}>
                    <Perk text={content.pages.comingSoon.description.perks[0]} >
                        <Paid fontSize="large" sx={{color:"secondary.main"}} />
                    </Perk>

                    <Perk text={content.pages.comingSoon.description.perks[1]} >
                        <NotificationsActiveIcon fontSize="large" sx={{color:"secondary.main"}} />
                    </Perk>

                    <Perk text={content.pages.comingSoon.description.perks[2]} >
                        <AlarmIcon fontSize="large" sx={{color:"secondary.main"}} />
                    </Perk>

                    <Perk text={content.pages.comingSoon.description.perks[3]} >
                        <CelebrationIcon fontSize="large" sx={{color:"secondary.main"}} />
                    </Perk>
                </Box>


                
              
               </Paper>
            </Box>
    );
}