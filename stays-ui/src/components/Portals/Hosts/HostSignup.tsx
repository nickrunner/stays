import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { Nav } from "../../AppBar/AppBar";
import OrgSignUp from "./OrgSignup";

export default function HostSignUp(props: any) {
  const router = useRouter();

  function handleIndividualClick() {
    console.log("Individal click");
  }

  return (
    <React.Fragment>
      <Nav transparent={false} />
      <Box
        sx={{
          maxWidth: "lg",
          margin: "auto",
          mt: 15,
          display: "grid",
          justifyContent: "center"
        }}>
        <Box sx={{ m: 5 }}>
          <Typography align="center" variant="h5">
            What best describes you as a host?
          </Typography>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            onClick={() => {
              handleIndividualClick();
            }}
            variant="outlined"
            sx={{ width: 300, height: 300, m: 5 }}>
            <Typography variant="h6">I am an individual</Typography>
          </Button>
          <Button
            onClick={() => {
              router.push("/hosts/org/sign-up");
            }}
            variant="outlined"
            sx={{ width: 300, height: 300, m: 5 }}>
            <Typography variant="h6">I represent a property management organization</Typography>
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
