import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, FormGroup, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import { StayClient } from "../../../src/clients/stayClient";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4
};

export default function AddStayAttribute(props: any) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [icon, setIcon] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  function getAttributeTypeText() {
    return props.type;
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      await new StayClient().addStayAttribute(props.type, name, icon, description);
    } catch (e: any) {
      if (e.message == "Request failed with status code 409") {
        setErrMsg("Attribute Already Exists");
      } else {
        setErrMsg(e.message);
      }
    }

    setLoading(false);
  }

  return (
    <Box sx={style}>
      <Typography variant="h6" gutterBottom>
        {"Add " + getAttributeTypeText()}
      </Typography>
      <FormGroup>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl sx={{ mt: 1, width: "65%" }}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                onChange={(e: any) => setName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label={"Description of " + props.type}
              fullWidth
              multiline
              rows={5}
              onChange={(e: any) => setDescription(e.target.value)}
            />
          </Grid>
          <Typography sx={{ m: 2 }} variant="subtitle1">
            {errMsg}
          </Typography>
        </Grid>
        <div>
          <LoadingButton
            sx={{ m: 2, width: "20%" }}
            onClick={() => handleSubmit()}
            variant="contained"
            loading={loading}
            loadingPosition="end">
            Submit
          </LoadingButton>
          <Button sx={{ m: 2, width: "20%" }} variant="contained">
            Cancel
          </Button>
        </div>
      </FormGroup>
    </Box>
  );
}
