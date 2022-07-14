import { Grid, TextField } from "@mui/material";
import React from "react";

import DatePick from "../general/DatePicker";
import { stayPromotionContext } from "./StayPromotionContext";

export default function CreatePost(props: any) {
  const { promotion } = React.useContext(stayPromotionContext);

  function handleDateSelect(date: Date | null) {
    console.log("Date select");
    promotion.startDate = date ? date.getTime() : 0;
  }

  function onSummaryChange(summary: string) {
    promotion.summary = summary;
  }

  function onDetailsChange(details: string) {
    promotion.details = details;
  }

  function onBookingLinkChange(bookingLink: string) {
    promotion.bookingLink = bookingLink;
  }

  function onTagsChange(tags: string) {
    console.log("Tags " + tags);
  }

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onSummaryChange(e.target.value);
            }}
            required
            id="summary"
            name="Summar"
            label="Summary"
            fullWidth
            multiline
            defaultValue={promotion.summary}
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onDetailsChange(e.target.value);
            }}
            required
            id="details"
            name="details"
            label="Details"
            fullWidth
            multiline
            defaultValue={promotion.details}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onBookingLinkChange(e.target.value);
            }}
            defaultValue={promotion.bookingLink}
            required
            id="link"
            name="link"
            label="Booking Link"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              onTagsChange(e.target.value);
            }}
            defaultValue={promotion.tags}
            required
            id="tags"
            name="tags"
            label="Tags"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePick onChange={handleDateSelect} default={new Date(promotion.startDate)} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
