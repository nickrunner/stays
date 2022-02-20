import React from "react";
import AboutCard from "./AboutCard";
import { Box } from "@mui/material";
import { TravelExplore } from "@mui/icons-material";
import { Cabin } from "@mui/icons-material";

export default function About (props: any) {
    return(
    <Box sx={{display: {xs:"grid", md: "flex"}, gap: 5, justifyContent: "center"}}>
        <AboutCard 
            title="For Travelers"
            subheader="Find, Follow and Book your dream vacation rental"
            description={
                [
                    "FREE Membership,",
                    "Booking Perks",
                    "Exclusive Rental Access",
                    "Automatic Entries into Vacation Giveaways",
                    "Discounted Stays",
                    "Cancellation Notices",
                    "Powerful Search Tool"
                ]
            }
        >
            <TravelExplore fontSize="large" />
        </AboutCard>

        <AboutCard 
        title="For Hosts"
        subheader="Engage with Travelers and Promote your Stay"
        description={
            [
                "Social Media Engagement",
                "Marketing and Visibility",
                "Private Booking Funnels,",
                "Promotional Opportunities",
                "Networking with Content Creators",
                "Cancellation Risk Management",
            ]
        }
        >
            <Cabin fontSize="large" />
        </AboutCard>
    </Box>
    );
}