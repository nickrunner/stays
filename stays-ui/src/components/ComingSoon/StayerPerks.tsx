import { Box, Typography, Paper } from "@mui/material";
import { content } from "../../content";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AlarmIcon from '@mui/icons-material/Alarm';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Paid, } from "@mui/icons-material"
import Perk from "./Perk";

export default function StayerPerks (props: any)  {
    const perks = content.pages.comingSoon.about.stayerPerks;
    return (
        <Box>
            <Perk text={perks[0].header}
                subText={perks[0].sub}>
                <SavedSearchIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[1].header}
                subText={perks[1].sub}>
                <AccountCircleIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[2].header}
                subText={perks[2].sub}>
                <BookOnlineIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[3].header}
                subText={perks[3].sub}>
                <CelebrationIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[4].header}
                subText={content.pages.comingSoon.about.stayerPerks[4].sub}>
                <Paid fontSize="large" sx={{color:props.iconColor}} />
            </Perk>

            <Perk text={perks[5].header}
                subText={perks[5].sub}>
                <NotificationsActiveIcon fontSize="large" sx={{color:props.iconColor}} />
            </Perk>
        </Box>
    );
}