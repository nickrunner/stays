import React from "react";
import { Box, Button,  fabClasses,  Modal } from "@mui/material";
import Waitlist from "./Waitlist";
import Description from "./Description";
import Details from "./Details";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import Mockups from "./Mockups";
import SocialProof from "./SocialProof";
import Section from "../general/Section";
import SectionDivider from "../general/SectionDivider";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ComingSoon(){
    const [waitlistOpen, setWaitlistOpen] = React.useState(false);

    function closeWaitlist()
    {
      console.log("Close Waitlist");
      setWaitlistOpen(false)
    }

    return (
        <React.Fragment>

          <Modal 
            open={waitlistOpen}
            onClose={() => {closeWaitlist()}}
          >
            <Waitlist 
              close={closeWaitlist}
            />
          </Modal>

          <Section>
            <Hero height="85%"/>
          </Section>

          <Box
            alignSelf='center' alignItems='center' alignContent='center'
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: "95%",
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Section>
              <Description />
            </Section>

            <Section>
              <About />
            </Section>
 
            <Section>
              <Mockups />
            </Section>
   
            <Section>
              <SocialProof />
            </Section>
     
            <Section>
              <Details />
            </Section>
             
            <Box sx={{p:"0%"}}>
              <Button 
                  variant="contained" 
                  onClick={() => setWaitlistOpen(true)}
                  size="large"
                  sx={{
                      mb:15,
                      width:300
                  }}>
                  Join the Waitlist
              </Button>
            </Box>

            <Box maxWidth="lg"  sx={{p:"1%", display: "flex"}}> 
              <Footer />
            </Box>
          </Box> 
        </React.Fragment>
    );
}