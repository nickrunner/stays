import { BookOnline, Loyalty, Search } from "@mui/icons-material";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { Box, Button, Container, Grid, SxProps, Theme, Typography } from "@mui/material";
import { useRouter } from "next/router";
import * as React from "react";

import { content } from "../../content";
import SectionHead from "../general/SectionHead";

export default function Description() {
  const router = useRouter();

  const item: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    p: 5
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "grid"
      }}>
      <SectionHead>How it works</SectionHead>
      {/* <KeyboardDoubleArrowDownIcon fontSize="large" sx={{ mb: 2 }} /> */}

      <Grid container sx={{ p: 5, pb: 10 }}>
        <Grid item xs={12} md={4}>
          <Box sx={item}>
            <Search sx={{ p: 3, fontSize: 100, color: "primary.main" }} />
            <Typography variant="h6" align="center">
              Browse our expert curated collection of unique vacation rentals.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={item}>
            <Loyalty sx={{ p: 3, fontSize: 100, color: "primary.main" }} />
            <Typography variant="h6" align="center">
              Become a member and get notified of vacancies before anyone else.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={item}>
            <BookOnline sx={{ p: 3, fontSize: 100, color: "primary.main" }} />
            <Typography variant="h6" align="center">
              Book directly with the source. By cutting out the middle-man, you save on your booking
              cost.
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Button
        color="primary"
        size="large"
        variant="contained"
        component="a"
        onClick={() => {
          router.push("/premium-sign-up");
        }}
        sx={{ width: 300, margin: "auto" }}>
        Get started
      </Button>
    </Box>
  );
}
