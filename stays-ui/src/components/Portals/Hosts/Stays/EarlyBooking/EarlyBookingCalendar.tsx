import { DateRange, LoadingButton } from "@mui/lab";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";

import { StayClient } from "../../../../../clients/stayClient";
import { StayRecord } from "../../../../../models";
import DateRangePicker from "../../../../general/DateRangePicker";
import Popup from "../../../../general/Popup";

export interface EarlyBookingCalendarProps {
  stay: StayRecord | undefined;
  close: () => void;
}

export default function EarlyBookingCalendar(props: EarlyBookingCalendarProps) {
  const [msg, setMsg] = React.useState("");
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange<Date>>([null, null]);
  const [loading, setLoading] = React.useState(false);
  const [submitEnabled, setSubmitEnabled] = React.useState(false);
  const [link, setLink] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Submit");
    if (!props.stay) {
      console.log("Stay was undefined");
      setLoading(false);
      return;
    }
    if (!selectedDateRange[0] || !selectedDateRange[1]) {
      return;
    }
    setLoading(true);
    await new StayClient().createEarlyBooking(
      props.stay.id,
      selectedDateRange[0],
      selectedDateRange[1],
      link
    );
    setLoading(false);
    props.close();
  }

  function handleDateRangeSelect(dateRange: DateRange<Date>) {
    if (!props.stay) {
      return;
    }
    setSelectedDateRange(dateRange);
  }

  function handleLinkChange(newLink: string) {
    setLink(newLink);
    setSubmitEnabled(true);
  }

  return (
    <React.Fragment>
      <Popup close={props.close} submit={handleSubmit}>
        <Typography sx={{ margin: "auto", p: 2 }} variant="subtitle1">
          Schedule Early Booking
        </Typography>
        <DateRangePicker onChange={handleDateRangeSelect} />
        <TextField
          sx={{ p: 3 }}
          required
          fullWidth
          onChange={(event: any) => handleLinkChange(event.target.value)}
          id="link"
          label="Early Booking Link"
          name="link"
        />
        <Typography sx={{ margin: "auto", p: 2 }} variant="subtitle2">
          {msg}
        </Typography>
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
    </React.Fragment>
  );
}
