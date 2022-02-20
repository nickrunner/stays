import Waitlist from "./Waitlist";
import { Box, Button, Stack, Typography, Modal } from "@mui/material";
import React from "react";
import styles from "../../../styles/ComingSoon.module.css";
import { globalContext } from "../../GlobalStore";
import { content } from "../../content";
import Image from "next/image";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";

export default function Hero(props: any) {
    const {globalState} = React.useContext(globalContext);
    const [waitlistOpen, setWaitlistOpen] = React.useState(false);

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
                    src={content.images.abed}
                    layout="fill"
                    priority
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
                    align="left"
                    color="common.white"
                    >
                        {content.pages.comingSoon.hero.main}
                    </Typography>
                    <Typography
                    sx={{mt:{xs:10, sm:5,  md:5, lg:5, xl:5}}}
                    variant="h5"
                    align="left"
                    color="common.white"
                    gutterBottom
                    >
                        <br></br>
                        {content.pages.comingSoon.hero.sub}
                    </Typography>
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
                </Stack>
            </Box>
            
        </React.Fragment>
    );
}