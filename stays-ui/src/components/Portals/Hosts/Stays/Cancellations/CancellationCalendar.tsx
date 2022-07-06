import { DateRange, LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import React from "react";

import { CancellationClient } from "../../../../../clients/cancellationClient";
import { globalContext } from "../../../../../GlobalStore";
import { StayRecord } from "../../../../../models";
import DateRangePicker from "../../../../general/DateRangePicker";
import Popup from "../../../../general/Popup";

export interface CancellationCalendarProps {
  stay: StayRecord | undefined;
  close: () => void;
}

export default function CancellationCalendar(props: CancellationCalendarProps) {
  const { globalState, dispatch } = React.useContext(globalContext);
  const [msg, setMsg] = React.useState("");
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange<Date>>([null, null]);
  const [loading, setLoading] = React.useState(false);
  const [submitEnabled, setSubmitEnabled] = React.useState(false);

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
    await new CancellationClient().createCancellation({
      stayId: props.stay.id,
      startDate: selectedDateRange[0].getTime(),
      endDate: selectedDateRange[1].getTime()
    });
    setLoading(false);
    props.close();
  }

  function handleDateRangeSelect(dateRange: DateRange<Date>) {
    if (!props.stay) {
      return;
    }
    setSelectedDateRange(dateRange);
    setSubmitEnabled(true);
  }
  0;

  return (
    <React.Fragment>
      <Popup close={props.close} submit={handleSubmit}>
        <Typography sx={{ margin: "auto", p: 2 }} variant="subtitle1">
          New Cancellation
        </Typography>
        <DateRangePicker onChange={handleDateRangeSelect} />
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
