import Waitlist from "./Waitlist";
import { Box, Button, Stack, Typography, Modal } from "@mui/material";
import React from "react";
import styles from "../../../styles/ComingSoon.module.css";
import { globalContext } from "../../GlobalStore";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
import { content } from "../../content";
import Image from "next/image";

export default function Hero(props: any) {
    const [waitlistOpen, setWaitlistOpen] = React.useState(false);
    const heroImg = content.images.hero.woodhouse;

    return (
        <React.Fragment>
            <Modal 
                open={waitlistOpen}
                onClose={() => {setWaitlistOpen(false)}}
            >
                <Waitlist type={props.type} />
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
         
        
         
            <Box maxWidth="md" maxHeight="75%" 
            sx={{
                display: 'flex',
                position: "absolute",
                top:"3%",
                left:"3%",
                p:5
            }}>
                <Stack>
                    
                    <Typography
                    variant= "h1"
                    color="common.white"
                    >
                        {content.pages.comingSoon.hero.main}
                    </Typography>
                    <Typography
                    sx={{mt:{xs:"15%", sm:"10%"}, align:{xs: "center", lg: "center"} }}
                    variant="h5"
                    color="common.white"
                    gutterBottom
                    >
                        {content.pages.comingSoon.hero.sub}
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => setWaitlistOpen(true)}
                        size="large"
                        sx={{
                            // fontSize: "1.5rem",
                            // fontWeight: "700",
                            mt:{xs:"15%", sm:"7%"},
                            width:{xs: 200, md: 300}
                        }}>
                        Join the Waitlist
                    </Button>
                </Stack>
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