import { Box, Typography } from '@mui/material';

export default function AboutCard(props: any) {
  return (
    <Box sx={{ maxWidth: 500, display: 'grid' }}>
      <Typography align="left" variant="h4" fontWeight="900" color="text.primary">
        {props.title}
      </Typography>

      <Box sx={{ mt: 1 }}>{props.children}</Box>
    </Box>
  );
}
