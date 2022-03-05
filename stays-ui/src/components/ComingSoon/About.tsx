import { Box } from '@mui/material';
import React from 'react';

import styles from '../../../styles/ComingSoon.module.css';
import { content } from '../../content';
import EmphasizedText from '../EmphasizedText';
import SectionHead from '../general/SectionHead';
import AboutCard from './AboutCard';
import HostPerks from './HostPerks';
import StayerPerks from './StayerPerks';

export default function About(props: any) {
  return (
    <Box sx={{ display: 'grid', gap: 10 }}>
      <SectionHead>
        <EmphasizedText
          fullText={content.pages.comingSoon.about.header}
          emphasis={' stays.co '}
          class={styles.empMain}
        />
      </SectionHead>

      <Box sx={{ display: { xs: 'grid', md: 'flex' }, gap: 5, justifyContent: 'center' }}>
        <AboutCard title={content.pages.comingSoon.about.sub1} subheader="">
          <StayerPerks iconColor="primary.main" />
        </AboutCard>

        <AboutCard title={content.pages.comingSoon.about.sub2} subheader="">
          <HostPerks iconColor="primary.main" />
        </AboutCard>
      </Box>
    </Box>
  );
}
