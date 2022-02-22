import React from "react";
import { Box, Button, Modal } from "@mui/material";
import Waitlist from "./Waitlist";
import Description from "./Description";
import Perks from "./Perks";
import Details from "./Details";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import PerkList from "./PerkList";
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
              sx={{
                p: {xs:2, md:5},
                display: "flex"
              }}
            >
              <PerkList />
            </Box>
            

            <Box
            maxWidth="lg"
            sx={{
              mt: 7,
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
                    width:300
                }}>
                Join the Waitlist
            </Button>
            </Box>

            <img 
            src={content.images.logo.purple}
            height="50"
            width="90"> 
            </img>
            
      
            <Box
            maxWidth="lg"
            margin="auto"
            sx={{
              mt:1,
              p:2
            }}>
              
              <Footer />
            </Box>
            
        </Box> 
            

        </React.Fragment>
        
    );
}