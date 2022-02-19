import { Button, Container, Typography } from '@mui/material';
import * as React from 'react';
import { useRouter } from "next/router";
import Jumbotron from '../Jumbotron';
import { globalContext } from '../../GlobalStore';

export default function Hero(props: any) {
  const {globalState, dispatch} = React.useContext(globalContext);
  let router = useRouter();

  return (  
    <Container
    sx={{
      mt: 3,
      mb: 14,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      zIndex: -1,
      width: "100%",
      height: "1"
    }}
  > 
      <Jumbotron backgroundImage="https://cdn.onekindesign.com/wp-content/uploads/2019/12/Rustic-Contemporary-A-Frame-Todd-Gordon-Mather-Architect-01-1-Kindesign.jpg">
          </Jumbotron>

        <Typography align="center" color="common.white" variant={globalState.mobile ? "h2" : "h1"} sx={{ mb: 4, mt: { sx: 5, sm: 15 } }}>
            Stay in luxury.  Save Money. 
        </Typography>
        <Typography
            color="common.white"
            align="center"
            variant={globalState.mobile ? "h5" : "h4"}
            sx={{mb: 8, mt: { sx: 4, sm: 8 } }}
        >
            Book directly with elite vacation rentals
        </Typography>

        <Button
            color="primary"
            variant="contained"
            size="large"
            component="a"
            onClick={() => router.push("/directory")}
            sx={{ minWidth: 200}}
        >
            Find your stay
        </Button>

    </Container>
     
  );
}