import { Typography, Box } from "@mui/material";

export default function Perk(props: any){
    return (
        <Box sx={{p:2, display:"flex", gap:2}}>
            {props.children}
            <Typography
                sx={{mt:0.5}}
                variant="subtitle1"
                color="primary.main"
            >
                {props.text}
            </Typography>
        </Box>
    );
}