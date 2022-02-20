import { Grid, Box } from "@mui/material";
import Link from "../Link";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import Copyright from "../Copyright";
import { content } from "../../content";

export default function Footer(props: any) {
    return ( 
        <Box>
            

        <Grid container spacing={1} alignItems="center" justifyContent="center">
            <Box sx={{m:2, mb:10}}>
            <Link
                href="https://www.facebook.com/americanstays/"
                target="_blank"
            >
                <FacebookIcon
                fontSize="large"
                />
            </Link>
            </Box>
            <Box sx={{m:2, mb:10}}>
            <Link href="https://www.instagram.com/americanstays/?hl=en" target="_blank">
                <InstagramIcon fontSize="large" color="primary" />
            </Link>
            </Box>
        </Grid>


        <Box
            sx={{
                mb:4
            }}
        >
            <Copyright/>
        </Box>
        </Box>
    );
}