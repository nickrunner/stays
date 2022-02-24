import React from "react";
import { Box, Button, Container, Modal, Divider } from "@mui/material";
import Waitlist from "./Waitlist";
import Description from "./Description";
import Perks from "./Mockups";
import Details from "./Details";
import Footer from "./Footer";
import Hero from "./Hero";
import About from "./About";
import PerkList from "./StayerPerks";
import { content } from "../../content";
import Mockups from "./Mockups";
import Partners from "./Partners";

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

          <section>
            <Hero height="85%"/>
          </section>
          
          

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
            <section>
              <Box maxWidth="lg"  sx={{p:"10%", display: "flex"}}>
                <Description />
              </Box>
            </section>

            <Divider sx={{p:0.1, width:"100%", bgcolor:"primary.dark" }} /> 
            
            <section>
              <Box maxWidth="lg"  sx={{p:"10%", display: "flex"}}>
                <About />
              </Box>
            </section>
          
            <Divider sx={{p:0.1, width:"100%", bgcolor:"primary.dark" }} /> 
            
            <section>
              <Box maxWidth="lg" sx={{p:"10%", display: "flex"}}>
                <Mockups />
              </Box>
            </section>
    
            <Divider sx={{p:0.1, width:"100%", bgcolor:"primary.dark" }} /> 

            <section>
              <Box maxWidth="lg" sx={{p:"10%", display: "flex"}}>
                <Partners />
              </Box>
            </section>

            <Divider sx={{p:0.1, width:"100%", bgcolor:"primary.dark" }} /> 

            <section>
              <Box maxWidth="lg"  sx={{p:"10%", display: "flex"}}>
                <Details />
              </Box>
            </section>

            <Divider sx={{p:0.1, width:"100%", bgcolor:"primary.dark" }} /> 
             
            <Box maxWidth="lg" sx={{p:"10%", display: "flex"}}> 

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
           

                  
            <Box maxWidth="lg"  sx={{p:"1%", display: "flex"}}> 
              <Footer />
            </Box>
       
            
  
          </Box> 

        </React.Fragment>
        
    );
}