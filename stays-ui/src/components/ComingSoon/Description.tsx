import { Box, Typography } from "@mui/material";
import { content } from "../../content";

import styles from "../../../styles/ComingSoon.module.css";
import Image from "next/image";

export default function(props: any){
    return (
        <Box maxWidth="lg" sx={{display:"grid", gap:7}}>
            
            <Typography
            variant="h1"
            color={"common.black"}
            >
            {content.pages.comingSoon.description.hook}
            </Typography>
                
            <Box sx={{maxWidth:{xs:300, md:900}, margin:"auto", display:{xs:"grid", md:"flex"}, gap:3, justifyContent:"center"}}>

                <Box sx={{
                    width: {xs:180, md:500},
                }}>
                    <Image 
                        src={content.images.logo.purple}
                        height="100"
                        width="180"
                        alt="Stays Logo"> 
                    </Image>
                </Box>
            
                <Typography
                    variant="h5"
                    align="left"
                    color="primary.main"
                    >
                    {content.pages.comingSoon.description.line1}
                    <span className={styles.mycc}>{content.pages.comingSoon.description.emphasis}</span>
                    {content.pages.comingSoon.description.line2}
                </Typography>
            </Box>
        </Box>
    );
}