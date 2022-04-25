import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { OrgClient } from "../../../clients/orgClient";
import { UserClient } from "../../../clients/userClient";
import { globalContext } from "../../../GlobalStore";
import { UserRecord } from "../../../models";
import { Nav } from "../../AppBar/AppBar";
import OrgSignUp from "./OrgSignup";

export default function HostSignUp(props: any) {
  const router = useRouter();
  const { globalState, dispatch } = React.useContext(globalContext);

  async function handleIndividualClick() {
    console.log("Individal click");
    if (!globalState.self) {
      return;
    }
    try {
      await new OrgClient().createOrg({
        name: globalState.self.email,
        userIds: [globalState.self.id],
        stayIds: []
      });
      const self: UserRecord = await new UserClient().getSelf();
      dispatch({ type: "GET_SELF", payload: self });
      await router.push("/hosts/portal/stays");
    } catch (err) {
      console.log("Failed creating org: " + err);
    }
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
