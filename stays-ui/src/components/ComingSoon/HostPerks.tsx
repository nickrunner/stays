import { Paid } from '@mui/icons-material';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import InstagramIcon from '@mui/icons-material/Instagram';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import RocketIcon from '@mui/icons-material/Rocket';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import { Box } from '@mui/material';

import { content } from '../../content';
import Info from '../general/Info';

export interface HostPerksProps {
  iconColor: string;
}

export default function HostPerks(props: HostPerksProps) {
  const perks = content.pages.comingSoon.about.hostPerks;
  return (
    <Box>
      <Info
        title={perks[0].header}
        body={perks[0].sub}
        icon={<TravelExploreIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[1].header}
        body={perks[1].sub}
        icon={<InstagramIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[2].header}
        body={perks[2].sub}
        icon={<RocketIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[3].header}
        body={perks[3].sub}
        icon={<LoyaltyIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[4].header}
        body={perks[4].sub}
        icon={<Paid fontSize="large" sx={{ color: props.iconColor }} />}
      />

      <Info
        title={perks[5].header}
        body={perks[5].sub}
        icon={<CancelScheduleSendIcon fontSize="large" sx={{ color: props.iconColor }} />}
      />
    </Box>
  );
}
