import { DesktopDatePicker, LocalizationProvider, MobileDatePicker } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

export interface DatePickerProps {
  onChange: (date: Date | null) => void;
}

export default function DatePick(props: DatePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  function handleDateSelect(date: Date | null) {
    setSelectedDate(date);
    props.onChange(date);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <MobileDatePicker
          value={selectedDate}
          onChange={handleDateSelect}
          label="Date"
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <DesktopDatePicker
          value={selectedDate}
          onChange={handleDateSelect}
          label="Date"
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
}
