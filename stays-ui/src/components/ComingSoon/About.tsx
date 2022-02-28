import React from "react";
import AboutCard from "./AboutCard";
import { Box} from "@mui/material";
import StayerPerks from "./StayerPerks";
import HostPerks from "./HostPerks";
import { content } from "../../content";
import SectionHead from "../general/SectionHead";
import EmphasizedText from "../EmphasizedText";
import styles from "../../../styles/ComingSoon.module.css";

export default function About (props: any) {
    return(
   
        <Box sx={{display:"grid", gap:10}}>
            <SectionHead>
                <EmphasizedText
                    fullText={content.pages.comingSoon.about.header}
                    emphasis={" stays.co "}
                    class={styles.empMain}
                />
            </SectionHead> 
        
            <Box sx={{display: {xs:"grid", md: "flex"}, gap: 5, justifyContent: "center"}}>
                
                <AboutCard 
                    title={content.pages.comingSoon.about.sub1}
                    subheader=""
                >
                    <StayerPerks iconColor="primary.main"/>
                </AboutCard>

                <AboutCard 
                    title={content.pages.comingSoon.about.sub2}
                    subheader=""
                >
                    <HostPerks iconColor="primary.main"/>
                </AboutCard>
            </Box>
        </Box>
    );
}