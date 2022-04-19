/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoadingButton } from "@mui/lab";
import { Box, Button, FormControl, FormGroup, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import { SitePromotionClient } from "../../clients/sitePromotionClient";

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

export default function AddPromotion() {
  const [name, setName] = React.useState("");
  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  async function handleSubmit() {
    setLoading(true);
    try {
      await new SitePromotionClient().addSitePromotion(code, name);
    } catch (e: any) {
      if (e.message == "Request failed with status code 409") {
        setErrMsg("Promotion Already Exists");
      } else {
        setErrMsg(e.message);
      }
    }

    setLoading(false);
  }

  return (
    <Box sx={style}>
      <Typography variant="h6" gutterBottom>
        {"Add Promotion"}
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
            <FormControl sx={{ mt: 1, width: "65%" }}>
              <TextField
                required
                id="code"
                name="code"
                label="Code"
                onChange={(e: any) => setCode(e.target.value)}
              />
            </FormControl>
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
