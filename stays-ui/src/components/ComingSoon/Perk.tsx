import { Typography, Box, Stack } from "@mui/material";

export default function Perk(props: any){
    return (
        <Box sx={{pt:2, pb:2, display:"flex", gap:2}}>
            {props.children}
            <Stack>
            <Typography
                sx={{mt:0.5}}
                variant="subtitle1"
                color="common.black"
            >
                {props.text}
            </Typography>
            <Typography sx={{mt:0.5}}
                variant="body1"
                color="common.black"
            >
                {props.subText}
            </Typography>
            </Stack>
        </Box>
    );
}