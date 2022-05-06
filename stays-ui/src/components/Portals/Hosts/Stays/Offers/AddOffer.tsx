import { ConstructionOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, FormGroup, Grid, TextField, Typography } from "@mui/material";
import React from "react";

import { OfferClient } from "../../../../../clients/offerClient";
import { StayClient } from "../../../../../clients/stayClient";
import { StayRecord } from "../../../../../models";
import Popup from "../../../../general/Popup";

export interface AddOfferProps {
  stay: StayRecord | undefined;
  close: () => void;
}

export default function AddOffer(props: AddOfferProps) {
  const [msg, setMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitEnabled, setSubmitEnabled] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit");
    if (!props.stay) {
      console.log("Stay was undefined");
      setLoading(false);
      return;
    }

    setLoading(true);
    await new OfferClient().createOffer({
      title: title,
      description: description,
      stayId: props.stay.id
    });
    setLoading(false);
    props.close();
  }

  function handleTitleChange(title: string) {
    setTitle(title);
  }

  function handleDescriptionChange(description: string) {
    setDescription(description);
  }

  React.useEffect(() => {
    setSubmitEnabled(description != "" && title != "");
  }, [description, title]);

  return (
    <Popup close={props.close} submit={handleSubmit}>
      <Typography sx={{ margin: "auto", p: 2 }} variant="subtitle1">
        New Offer
      </Typography>
      <FormGroup>
        <Grid container spacing={3} sx={{ p: 5 }}>
          <Grid item xs={12}>
            <TextField
              required
              id="title"
              name="title"
              label="Title"
              defaultValue={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Description of Offer"
              fullWidth
              multiline
              rows={5}
              defaultValue={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
            />
          </Grid>
        </Grid>
      </FormGroup>
      <Box sx={{ m: "5%" }}>
        <LoadingButton
          type="submit"
          loading={loading}
          disabled={!submitEnabled}
          loadingPosition="end"
          variant="contained"
          size="large">
          Submit
        </LoadingButton>
      </Box>
    </Popup>
  );
}
