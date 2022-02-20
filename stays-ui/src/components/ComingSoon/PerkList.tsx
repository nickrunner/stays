import { Box, Typography, Paper } from "@mui/material";
import { content } from "../../content";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AlarmIcon from '@mui/icons-material/Alarm';
import { Check, Paid, AttachMoney } from "@mui/icons-material"
import styles from "../../../styles/ComingSoon.module.css";
import Perk from "./Perk";

export default function PerkList (props: any)  {
    return (
        <Box maxWidth="sm" margin="auto" sx={{mt:5, justifyContent:"center"}}>
                <Paper sx={{
                    p:5, 
                    justifyContent:"center", 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',}}>
                <img 
                src={content.images.logo.purple}
                height="100"
                width="180"> 
                </img>
                <Typography
                    sx={{m:3}}
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


                <Typography
                    variant="subtitle1"
                    align="left"
                    color="primary.main"
                    sx={{p:1, pl:3}}
                >
                </Typography>
              
               </Paper>
            </Box>
    );
}