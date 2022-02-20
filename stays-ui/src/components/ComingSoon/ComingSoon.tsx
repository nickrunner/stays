import React from "react";
import Container from "@material-ui/core/Container";
import { Box, Button, Modal, Typography } from "@mui/material";
import { globalContext } from "../../GlobalStore";
import Waitlist from "./Waitlist";
import Filtering from "./Filtering";
import Description from "./Description";
import Perks from "./Perks";
import Details from "./Details";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import { content } from "../../content";

export default function ComingSoon(props: any){
    const [waitlistOpen, setWaitlistOpen] = React.useState(false);

    return (
        <React.Fragment>

          <Modal 
            open={waitlistOpen}
            onClose={() => {setWaitlistOpen(false)}}
          >
            <Waitlist />
          </Modal>

          <Hero height="80%"/>

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

            <Box
              maxWidth="lg"
              sx={{
                p: {xs:2, md:5},
                display: "flex"
              }}
            >
              <Description />
            </Box>

            <Box
            maxWidth="lg"
            margin="auto"
            sx={{
              m: 5,
              p: {xs:2, md:5},
              display: "flex"
            }}>
              <About />
            </Box>

            <Box
            maxWidth="lg"
            margin="auto"
            sx={{
              m: 5,
              p: {xs:2, md:5},
              display: "flex"
            }}>
              <Perks />
            </Box> 

            <Box
            maxWidth="lg"
            margin="auto"
            sx={{
              m: 5,
              p: {xs:2, md:5},
              display: "flex"
            }}>
              <Details />
            </Box>
             
            <Box
            maxWidth="lg"
            margin="auto"
            sx={{
              m: 5,
              p: {xs:2, md:5},
              display: "grid"
            }}> 

            <Button 
                variant="contained" 
                onClick={() => setWaitlistOpen(true)}
                size="large"
                sx={{
                    mt:5,
                    width:300
                }}>
                Join the Waitlist
            </Button>
            </Box>

            <Box>
              <Footer />
            </Box>
            
        </Box> 
            

        </React.Fragment>
        
    );
}