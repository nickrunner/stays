import { Box, Typography, Grid } from "@mui/material";
import Image from 'next/image'
import { content } from "../../content";

export default function Filtering (props: any) {
    return (
        <Box>
            <Typography
                variant="h2"
                align="center"
                color="primary.main"
                >
                Our powerful filtering and favoriting features help you locate and save your next stay 
            </Typography>

            <Box 
                sx={{
                    mt:10, 
                    justifyContent:"center", 
                    display:{ xs: 'grid', md: 'flex' }, 
                    gap:5, 
                    }}
            >
              
                <img 
                height={500} 
                src={content.images.mockups.signIn}
                alt="Sign In Page" />

                <img  
                height={500} 
                src={content.images.mockups.collage}
                alt="Different types of properties" />
            </Box>
        </Box>
    );
}