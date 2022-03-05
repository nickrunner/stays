import { Box, Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export interface InfoProps {
  title: string;
  icon?: unknown;
  body: string;
}

export default function Info(props: PropsWithChildren<InfoProps>) {
  return (
    <Box sx={{ pt: 2, pb: 2, display: 'flex', gap: 2 }}>
      {props.icon}
      <Stack>
        <Typography sx={{ mt: 0.5 }} variant="subtitle1" color="text.primary">
          {props.title}
        </Typography>
        <Typography sx={{ mt: 0.5 }} variant="body1" color="text.primary">
          {props.body}
        </Typography>
        {props.children}
      </Stack>
    </Box>
  );
}
