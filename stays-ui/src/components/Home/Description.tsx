import { Box, Button, Container, Grid, SxProps, Theme, Typography } from '@mui/material';
import * as React from 'react';
import { content } from "../../content";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import {Search, Loyalty, BookOnline} from "@mui/icons-material";
import { useRouter } from 'next/router';


export default function Description(props: any) {
  const router = useRouter();

  const item: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };
  

  return (
    <Box
      component="section"
      sx={{ mt:20, display: 'flex', bgcolor: 'background.default', overflow: 'hidden'}}
    >
      <Container
        sx={{
          mt: 5,
          mb: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor:"backgound.default"
        }}
      >
        <Box
          component="img"
          src={content.images.dotMap}
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            width: "100%",
            top: 0,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" align="center" component="h2" sx={{ mb: 2 }}>
          How it works
        </Typography>
        <KeyboardDoubleArrowDownIcon fontSize="large" sx={{ mb: 2 }}/>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Search sx={{p:3, fontSize:100}}/>
                <Typography variant="h5" align="center">
                  Browse our expert curated collection of unique vacation rentals.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
              <Loyalty sx={{p:3, fontSize:100}}/>
                <Typography variant="h5" align="center">
                  Become a member and get notified of vacancies before anyone else.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
              <BookOnline sx={{p:3, fontSize:100}}/>
                <Typography variant="h5" align="center">
                  Book directly with the source.  By cutting out the middle-man, you save on your booking cost.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </div>
        <Button
          color="primary"
          size="large"
          variant="contained"
          component="a"
          onClick={() => { router.push("/premium-sign-up")} }
          sx={{ mt: 5 }}
        >
          Get started
        </Button>
      </Container>
    </Box>
   
  );
}