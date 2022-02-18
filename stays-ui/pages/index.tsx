import React from "react";
import { Typography } from "@mui/material";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import StaysPage from "../src/StaysPage";
import { Box, Stack } from "@mui/material";
import { globalContext } from "../src/GlobalStore";
import type { NextPage } from 'next';
import Waitlist from "../src/components/waitlist";
import styles from "../styles/ComingSoon.module.css";

const ComingSoon: NextPage = () => {
  const {globalState} = React.useContext(globalContext);
  

    function getBackground(){
      return globalState.mobile ? "https://static.wixstatic.com/media/d4ce6e_ce7e64141e1e4a539669c7227f1c0b23~mv2.jpg/v1/fill/w_2000,h_1313,al_c,q_90/d4ce6e_ce7e64141e1e4a539669c7227f1c0b23~mv2.jpg"
      : "https://www.woodnest.no/wp-content/uploads/17-min.jpg"
      //return "https://www.woodnest.no/wp-content/uploads/17-min.jpg"
    }
 

    return (
        <StaysPage>
        <Box
            sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height:"75%",
            bgcolor: 'primary.dark',
            zIndex: -1,
            justifyContent: "center"
            
        }}>
            <img
                className={styles.HeroImage}
                src={getBackground()}
                width="100%"
                height="100%"
            />

        </Box>
          <Container maxWidth="lg" >
            <Box maxWidth="50%" maxHeight="75%" sx={{
              position: "absolute",
              left: "10%",
              top: "10%"
            }}>
                
                <Typography
                variant="h2"
                align="left"
                color="common.white"
                >
                Connecting travelers with the best vacation rentals from around the world.
                </Typography>
                <Typography
                variant="h5"
                align="left"
                color="common.white"
                fontWeight="100"
                gutterBottom
                >
                  <br></br>
                Get booking perks, exclusive rental access and automatic entries into vacation giveaways with a FREE stayer membership.
                </Typography>
            </Box>

            <Box
             alignSelf='center' alignItems='center' alignContent='center'
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: "80%",
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box  maxWidth="lg"
                  justify-content="center"
                  alignItems="center">

                  <Typography
                    variant="h1"
                    align="center"
                    color="primary.main"
                    >
                    Coming June 2022
                  </Typography>
                  <br></br>
                  <Typography
                    variant="body1"
                    align="center"
                    >
                    stays.co isn't another booking website—it's a <b>free directory tool that helps travelers find, follow and book their dream vacation rental.</b> We partner with the world's best rentals to give our members perks such as discounted stays, cancellation opening notices, early access to booking calendars and even automatic entries into vacation giveaway contests!
                  </Typography>

                  <Box
                  maxWidth="sm"
                  margin="auto"
                  sx={{mt:10, mb:10, align:"center"}}>
                  <Waitlist />
                  </Box>

                  <Typography
                  variant="h2"
                  align="center"
                  color="primary.main"
                  >
                  Our powerful filtering and favoriting features help you locate and save your next stay 
                  </Typography>

                  <Box sx={{mt:10}}>
                    <Grid container spacing={1} alignItems="center" justifyContent="center">
                        <img height="500" src="https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Singles%204.png?alt=media&token=5bce7a31-0ec6-4cee-999f-0c3e5db82f47" alt="mockup" />
                        <img height="500" src="https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Singles%201.png?alt=media&token=fc40c1b3-5710-4986-9be6-8b1af730e7c4" alt="mockup" />
                    </Grid>
                  </Box>

                  <Box sx={{mt:20}}>
                    <Typography
                    variant="h2"
                    align="center"
                    color="primary.main"
                    >
                    Stays.co has a ton of perks for our traveler and rental host members
                    </Typography>
                    <Box sx={{mt:10}}>
                      <Grid container spacing={1} alignItems="center" justifyContent="center">
                          <img height="500" src="https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2F_Stays%20Mockups%20-%20Traveler%20Perks.png?alt=media&token=217fd2eb-27ac-413f-ad67-723b15848773" alt="mockup" />
                          <img height="500" src="https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2F_Stays%20Mockups%20-%20Host%20Perks.png?alt=media&token=9ff2e39f-f26d-4e71-ae4b-36e58bf6cf5e" alt="mockup" />
                      </Grid>
                    </Box>
                  </Box>

                  <Box sx={{mt:20}} >
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <img height="400" src="https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Singles%202.png?alt=media&token=02c93d41-a961-4f89-8c3b-cb441d928002" alt="mockup" />
                        </Grid>
                        <Grid item xs={3}>
                        <img height="400" src="https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Singles%203.png?alt=media&token=a77222f1-ac8d-45aa-9609-f19fb285b6d1" alt="mockup" />
                        </Grid>
                        <Grid item xs={6}>
                          <Stack sx={{pl:5}}>
                            <Typography variant="h3" color="primary.main">
                              Stays.co is a game-changer for both travelers and hosts
                            </Typography>
                            <br></br>
                            <Typography variant="body1">
                            Vacation rental hosts have become increasingly dependent on large booking platforms such as Airbnb, VRBO, etc for not only their booking management, but also for their marketing and visibility. 
                            <br></br>
                            <br></br>
                            Stays.co allows hosts to create 'Stay Profiles' on our website that allow travelers to find them, engage with their linked social media pages, visit their private website and/or be directed to book on any existing platform the host may be listed on. 
                            </Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                  </Box>

                  <Box 
                  maxWidth="sm"
                  margin="auto"
                  sx={{mt:10, mb:10, align:"center"}} >
                    <Waitlist />
                    
                  </Box>
              
                  <Grid container spacing={1} alignItems="center" justifyContent="center">
                    <Box sx={{m:2, mb:10}}>
                    <Link
                      href="https://www.facebook.com/americanstays/"
                      target="_blank"
                    >
                        <FacebookIcon
                        fontSize="large"
                        />
                    </Link>
                    </Box>
                    <Box sx={{m:2, mb:10}}>
                    <Link href="https://www.instagram.com/americanstays/?hl=en" target="_blank">
                        <InstagramIcon fontSize="large" color="primary" />
                    </Link>
                    </Box>
                </Grid>
              </Box>
              </Box>
        </Container>
        </StaysPage>
    );
}

export default ComingSoon