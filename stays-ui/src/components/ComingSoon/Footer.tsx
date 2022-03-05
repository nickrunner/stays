import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Box } from "@mui/material";
import Image from "next/image";

import { content } from "../../content";
import Copyright from "../Copyright";
import Link from "../Link";

export default function Footer() {
  return (
    <Box margin="auto" sx={{ display: "grid", gap: 5, justifyContent: "center" }}>
      <Image src={content.images.logo.purple} height="100" width="180" alt="Stays Logo"></Image>

      <Box sx={{ display: "flex", gap: 5 }} alignItems="center" justifyContent="center">
        <Link href="https://www.facebook.com/americanstays/" aria-label="Stays Facebook Page">
          <FacebookIcon fontSize="large" />
        </Link>

        <Link
          href="https://www.instagram.com/americanstays/?hl=en"
          aria-label="Stays Instagram Page">
          <InstagramIcon fontSize="large" color="primary" />
        </Link>
      </Box>

      <Copyright />
    </Box>
  );
}
