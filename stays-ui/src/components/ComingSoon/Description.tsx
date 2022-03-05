import { CheckCircleOutline } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

import styles from '../../../styles/ComingSoon.module.css';
import { content } from '../../content';
import StaysLogo from '../../logos/StaysLogo';
import EmphasizedText from '../EmphasizedText';
import Info from '../general/Info';
import SectionHead from '../general/SectionHead';
import Partners from './Partners';

export default function Description(props: any) {
  return (
    <Box sx={{ display: 'grid', gap: { xs: 5, sm: 5 }, justifyContent: 'center' }}>
      <SectionHead>{content.pages.comingSoon.description.header}</SectionHead>

      <Box sx={{ maxWidth: 'sm', p: 2, margin: 'auto' }}>
        <Partners />
      </Box>

      <Box
        sx={{
          display: { xs: 'grid', sm: 'flex' },
          gap: 5,
          border: { xs: 0, sm: 1 },
          borderColor: 'divider',
          borderRadius: 2,
          p: { xs: 0, sm: 5 }
        }}>
        <Box sx={{ display: 'block', mt: { xs: 1, sm: 7 }, gap: 0 }}>
          <Typography variant="h4" align="center" color="text.primary" fontWeight={900}>
            <EmphasizedText
              fullText={content.pages.comingSoon.description.headerSub}
              emphasis="stays.co"
              class={styles.empMain}
            />
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid'
          }}>
          <Info
            title="The best stays all in one place."
            icon={<CheckCircleOutline fontSize="large" sx={{ color: 'primary.main' }} />}
            body="">
            <EmphasizedText
              fullText={content.pages.comingSoon.description.sub1}
              emphasis="Travelers"
              class={styles.empMain}
            />
          </Info>

          <Info
            title="A community of travel enthusiasts."
            icon={<CheckCircleOutline fontSize="large" sx={{ color: 'primary.main' }} />}
            body="">
            <EmphasizedText
              fullText={content.pages.comingSoon.description.sub2}
              emphasis="Hosts "
              class={styles.empMain}
            />
          </Info>
        </Box>
      </Box>

      <Typography align="center" variant="h4" sx={{ mt: 10, color: 'text.primary' }}>
        {content.pages.comingSoon.description.line2}
      </Typography>
    </Box>
  );
}
