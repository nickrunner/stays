import Waitlist from "./Waitlist";
import { Box, Button, Stack, Typography, Modal, Container } from "@mui/material";
import React from "react";
import styles from "../../../styles/ComingSoon.module.css";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { content } from "../../content";
import Image from "next/image";

export default function Hero(props: any) {
    const [waitlistOpen, setWaitlistOpen] = React.useState(false);
    const heroImg = content.images.hero.woodhouse;

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

            <Box
                sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: props.height,
                bgcolor: 'primary.dark',
                zIndex: -1,
                justifyContent: "center"
            }}>
                <Image
                    className={styles.HeroImage}
                    src={heroImg.img}
                    layout="fill"
                    priority
                    placeholder="blur"
                    blurDataURL={heroImg.blur}
                    alt="Beautiful Vacation Rental"
                />
            </Box>
            

            <Box 
            sx={{
                width:"100%",
                position: "absolute",
                top:0,
                left:0,
                height: props.height
            }}>
                
                <Box
                sx={{
                    margin:{xs:"auto", sm:0},
                    maxWidth:{
                        xs: 400,
                        sm: 700,
                        lg: 800,
                        xl: 1000
                    },
                    p:{xs:"10%", sm:"5%"},
                    pt:{xs:"20%"},
                    display: "grid",
                    textAlign:{xs:"center", sm:"left"},
                    verticalAlign:"center",
                    alignContent:{xs:"center", sm:"left"},
                    //bgcolor:"secondary.main"
                }}>
                    
                    <Typography
                    variant= "h1"
                    color="common.white"
                    // sx={{mt:{xs:"5%", sm:"10%"}}}
                    fontWeight={700}
                    >
                        {content.pages.comingSoon.hero.main}
                    </Typography>
                    <Typography
                    sx={{
                        mt:{xs:"15%", sm:"5%"}, 
                        align:{xs: "center", lg: "center"}, 
                    }}
                    variant="h6"
                    color="common.white"
                    fontWeight={400}
                    gutterBottom
                    >
                        {content.pages.comingSoon.hero.sub}
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => setWaitlistOpen(true)}
                        size="large"
                        sx={{
                            margin:{xs:"auto", sm:0},
                            mt:{xs:"25%", sm:"7%"},
                            width:{xs: 200, md: 300},
                        }}>
                        Join the Waitlist
                    </Button>
                </Box>
            </Box>


            <Box
              alignSelf='center' alignItems='center' alignContent='center'
              sx={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: "90%",
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <KeyboardDoubleArrowDown 
                fontSize="large" 
                
                sx={{
                    margin: "auto",
                }}>
                </KeyboardDoubleArrowDown>
            </Box>

            
        </React.Fragment>
    );
}