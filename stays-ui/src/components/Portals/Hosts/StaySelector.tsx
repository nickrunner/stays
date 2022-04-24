import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

import { StayRecord } from "../../../models";

export interface StaySelectorProps {
  onStaySelected: (stay: StayRecord) => void;
  defaultStayId: string;
  orgId: string;
  stays: StayRecord[];
}

export function StaySelector(props: StaySelectorProps) {
  const [selectedStay, setSelectedStay] = React.useState<StayRecord | null>(null);
  const [selectedStayId, setSelectedStayId] = React.useState<string>("");

  React.useEffect(() => {
    props.onStaySelected(selectedStay as StayRecord);
    return;
  }, [selectedStay]);

  React.useEffect(() => {
    setSelectedStay(getSelectedStay(selectedStayId));
    return;
  }, [selectedStayId]);

  function getSelectedStay(stayId: string): StayRecord | null {
    for (const stay of props.stays) {
      if (stay.id === stayId) {
        return stay;
      }
    }
    return null;
  }

  function handleStayChange(newStayId: string) {
    setSelectedStayId(newStayId);
  }

  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "flex-end"
      }}>
      <FormControl variant="standard" sx={{ m: 1, width: "100%" }}>
        <InputLabel id="stay-label">Stay</InputLabel>
        <Select
          sx={{ color: "action.hover" }}
          labelId="stayLabel"
          id="stay-select"
          value={selectedStayId}
          defaultValue={props.defaultStayId}
          label="Stay"
          onChange={(event: SelectChangeEvent) => {
            handleStayChange(event?.target.value);
          }}>
          {props.stays.map((stay) => (
            <MenuItem key={stay.id} value={stay.id}>
              {stay.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
