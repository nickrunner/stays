import { Box, Stack } from '@mui/material';

import styles from '../../../styles/ComingSoon.module.css';
import { content } from '../../content';
import EmphasizedText from '../EmphasizedText';
import Info from '../general/Info';
import SectionHead from '../general/SectionHead';
import DetailsAccordion from './DetailsAccordion';

export default function Details() {
  return (
    <Box sx={{ display: { xs: 'grid' }, gap: 5, justifyContent: 'center' }}>
      <SectionHead>
        <EmphasizedText
          fullText={content.pages.comingSoon.details.header}
          emphasis=""
          class={styles.empMain}
        />
      </SectionHead>
      <Stack sx={{ justifyContent: 'center', gap: 5 }}>
        {content.pages.comingSoon.details.dropdowns.map((dropdown) => {
          return (
            <DetailsAccordion key={dropdown.header} header={dropdown.header}>
              {dropdown.sections.map((section) => {
                return (
                  <Info key={section.heading} title={section.heading} body={section.text}></Info>
                );
              })}
            </DetailsAccordion>
          );
        })}
      </Stack>
    </Box>
  );
}
