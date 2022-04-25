import { LoadingButton } from "@mui/lab";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { OrgClient } from "../../../clients/orgClient";
import { UserClient } from "../../../clients/userClient";
import { globalContext } from "../../../GlobalStore";
import { UserRecord } from "../../../models";
import { Nav } from "../../AppBar/AppBar";

export default function OrgSignUp(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [orgName, setOrgName] = React.useState("");
  const { globalState, dispatch } = React.useContext(globalContext);
  const router = useRouter();

  function handleOrgNameChange(name: string) {
    console.log("Name Change");
    setOrgName(name);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    console.log("Submit");
    if (!globalState.self) {
      setLoading(false);
      return;
    }
    try {
      await new OrgClient().createOrg({
        name: orgName,
        userIds: [globalState.self.id],
        stayIds: []
      });
      const self: UserRecord = await new UserClient().getSelf();
      dispatch({ type: "GET_SELF", payload: self });
      await router.push("/hosts/portal/stays");
    } catch (err) {
      console.log("Failed creating org");
    }
    setLoading(false);
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
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Typography align="center" variant="h5">
          Organization sign-up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 10 }}>
          <TextField
            required
            fullWidth
            onChange={(event: any) => handleOrgNameChange(event.target.value)}
            label="Organization Name"
          />

          <LoadingButton
            type="submit"
            fullWidth
            loading={loading}
            disabled={false}
            loadingPosition="end"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </React.Fragment>
  );
}
