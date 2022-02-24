import { Card, CardContent, CardHeader, Typography, Box } from "@mui/material";

export default function AboutCard(props: any) {
    return (

    <Box
    sx={{maxWidth:500, display:"grid"}}
    >
        <Typography 
        align='left'
        variant='h3'
        color="primary.main"
        >
            {props.title}
        </Typography>

        <Box sx={{mt:1}}>
            {props.children}
        </Box>
    </Box>
    );
}