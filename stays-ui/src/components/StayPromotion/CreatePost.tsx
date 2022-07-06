import { Grid, TextField } from "@mui/material";
import React from "react";

import DatePick from "../general/DatePicker";

export default function CreatePost(props: any) {
  function handleDateSelect(date: Date | null) {
    console.log("Date select");
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="summary"
            name="Summar"
            label="Summary"
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="details"
            name="details"
            label="Details"
            fullWidth
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="link" name="link" label="Booking Link" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="tags" name="tags" label="Tags" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePick onChange={handleDateSelect} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
