import { Box, Button, Grid, Modal } from "@mui/material";
import React from "react";
import { couldStartTrivia } from "typescript";

import { StayClient } from "../../clients/stayClient";
import { StayRecord } from "../../models";
import SignUp from "../SignUp";
import SignUpModal from "../SignUpModal";
import StayDirectoryCard from "./StayDirectoryCard";

export default function DirectoryListings(props: any) {
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  function openSignUpModal() {
    console.log("Sign up required");
    setSignUpOpen(true);
  }
  function onSignUpModalClose() {
    console.log("Sign Up Close");
    setSignUpOpen(false);
  }
  return (
    <React.Fragment>
      <SignUpModal open={signUpOpen} onClose={onSignUpModalClose} />

      <Grid container justifyContent="center" spacing={3} sx={{ bgcolor: "background.default" }}>
        {props.stays.map((stay: StayRecord) => (
          <Grid key={stay.id} item>
            <StayDirectoryCard
              filter={props.filter}
              stay={stay}
              onSignInRequired={openSignUpModal}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
