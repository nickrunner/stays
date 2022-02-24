import React from "react";
import AboutCard from "./AboutCard";
import { Box, Typography, Stack } from "@mui/material";
import { TravelExplore } from "@mui/icons-material";
import { Cabin } from "@mui/icons-material";
import StayerPerks from "./StayerPerks";
import HostPerks from "./HostPerks";
import { content } from "../../content";

export default function About (props: any) {
    return(
   
        <Box sx={{display:"grid", gap:10}}>
            <Typography
            variant="h1"
            align="left"
            color="common.black"
            >
                {content.pages.comingSoon.about.hook}
            </Typography>
        
            <Box sx={{display: {xs:"grid", md: "flex"}, gap: 5, justifyContent: "center"}}>
                
                <AboutCard 
                    title="For Travelers"
                    subheader=""
                >
                    <StayerPerks iconColor="primary.main"/>
                </AboutCard>

                <AboutCard 
                title="For Hosts"
                subheader=""
                >
                    <HostPerks iconColor="primary.main"/>
                </AboutCard>
            </Box>
        </Box>
    );
}