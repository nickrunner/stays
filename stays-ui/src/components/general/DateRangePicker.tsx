import { DateRange, LocalizationProvider, StaticDateRangePicker } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

export interface DateRangePickerProps {
  onChange: (dateRange: DateRange<Date>) => void;
}

export default function DateRangePicker(props: DateRangePickerProps) {
  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange<Date>>([null, null]);

  function handleCancellationDateRangeSelect(dateRange: DateRange<Date>) {
    console.log("Date Range: " + dateRange.toString());
    setSelectedDateRange(dateRange);
    props.onChange(dateRange);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: { xs: "block", lg: "none" } }}>
        <StaticDateRangePicker
          displayStaticWrapperAs="mobile"
          value={selectedDateRange}
          onChange={(newValue: DateRange<Date>) => {
            handleCancellationDateRangeSelect(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Box>
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          value={selectedDateRange}
          onChange={(newValue: DateRange<Date>) => {
            handleCancellationDateRangeSelect(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Box>
    </LocalizationProvider>
  );
}
