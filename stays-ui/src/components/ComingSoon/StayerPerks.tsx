import { Paid } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CelebrationIcon from '@mui/icons-material/Celebration';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import { Box } from '@mui/material';

import { content } from '../../content';
import Info from '../general/Info';

export interface StayerPerksProps {
  iconColor: string;
}

export default function StayerPerks(props: StayerPerksProps) {
  const perks = content.pages.comingSoon.about.stayerPerks;
  return (
    <Box>
      <Info
        title={perks[0].header}
        body={perks[0].sub}
        icon={<SavedSearchIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[1].header}
        body={perks[1].sub}
        icon={<AccountCircleIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[2].header}
        body={perks[2].sub}
        icon={<BookOnlineIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[3].header}
        body={perks[3].sub}
        icon={<CelebrationIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[4].header}
        body={perks[4].sub}
        icon={<Paid fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[5].header}
        body={perks[5].sub}
        icon={<NotificationsActiveIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />
    </Box>
  );
}
