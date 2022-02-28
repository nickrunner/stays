import { Box, Stack, Typography } from "@mui/material";
import {content} from "../../content";
import EmphasizedText from "../EmphasizedText";
import DetailsAccordion from "./DetailsAccordion";
import SectionHead from "../general/SectionHead";
import styles from "../../../styles/ComingSoon.module.css";

export default function Details() {
    return ( 
        <Box
        sx={{display: {xs: "grid"}, gap: 5, justifyContent:"center"}}>
            <SectionHead>
                <EmphasizedText
                    fullText={content.pages.comingSoon.details.header}
                    emphasis=""
                    class={styles.empMain}/>
            </SectionHead> 
            <Stack sx={{justifyContent:"center", gap:5}} >
                
                {content.pages.comingSoon.details.dropdowns.map((dropdown) => {
                    return (
                        <DetailsAccordion
                        key = {dropdown.header}
                        header = {dropdown.header}>
                            {dropdown.sections.map((section) => {
                                return (
                                    <Typography key={section}>
                                        {section}
                                        <br></br>
                                        <br></br>
                                    </Typography>
                                );
                            })}
                        </DetailsAccordion>
                    );
                })}
               

            </Stack>
        </Box>
    )
}