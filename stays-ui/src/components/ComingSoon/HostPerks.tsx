import { Box, Typography, Paper } from "@mui/material";
import { content } from "../../content";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AlarmIcon from '@mui/icons-material/Alarm';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import InstagramIcon from '@mui/icons-material/Instagram';
import RocketIcon from '@mui/icons-material/Rocket';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Paid, } from "@mui/icons-material"
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import Perk from "./Perk";

export default function HostPerks (props: any)  {
    const perks = content.pages.comingSoon.about.hostPerks;
    return (
        <Box>
            <Perk text={perks[0].header}
                subText={perks[0].sub}>
                <TravelExploreIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[1].header}
                subText={perks[1].sub}>
                <InstagramIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[2].header}
                subText={perks[2].sub}>
                <RocketIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[3].header}
                subText={perks[3].sub}>
                <LoyaltyIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[4].header}
                subText={content.pages.comingSoon.about.stayerPerks[4].sub}>
                <Paid fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[5].header}
                subText={perks[5].sub}>
                <CancelScheduleSendIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>
        </Box>
    );
}