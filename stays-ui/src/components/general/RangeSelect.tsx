import { Box, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";

import ValueSelect from "./ValueSelect";

export interface RangeSelectProps {
  defaultMin: string;
  defaultMax: string;
  vals: string[];
  label: string;
  sx: any;
  onChange: (min: string, max: string) => void;
}

export default function RangeSelect(props: RangeSelectProps) {
  const [min, setMin] = React.useState(props.defaultMin);
  const [max, setMax] = React.useState(props.defaultMax);
  const [minVals, setMinVals] = React.useState(props.vals);
  const [maxVals, setMaxVals] = React.useState(props.vals);

  function getMinVals(maxVal: string): string[] {
    const retVal =
      max === "None" ? props.vals : props.vals.slice(undefined, props.vals.indexOf(maxVal));
    retVal.unshift("None");
    return retVal;
  }

  function getMaxVals(minVal: string): string[] {
    const retVal =
      min === "None" ? props.vals : props.vals.slice(props.vals.indexOf(minVal), undefined);
    retVal.unshift("None");
    return retVal;
  }

  function handleMinChange(value: string) {
    setMin(value);
    setMaxVals(getMaxVals(value));
    props.onChange(value, max);
  }

  function handleMaxChange(value: string) {
    setMax(value);
    setMinVals(getMinVals(value));
    props.onChange(min, value);
  }

  return (
    <Box sx={props.sx}>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Box sx={{ width: "50%" }}>
          <InputLabel id={props.label + "min"}>{"Min"}</InputLabel>
          <ValueSelect
            label={"Min " + props.label}
            default={props.defaultMin}
            values={minVals}
            onSelect={(value: string) => handleMinChange(value)}
          />
        </Box>

        <Box sx={{ mt: 4, p: 1 }}>
          <Typography>-</Typography>
        </Box>

        <Box sx={{ width: "50%" }}>
          <InputLabel id={props.label + "max"}>{"Max"}</InputLabel>
          <ValueSelect
            label={"Max " + props.label}
            default={props.defaultMax}
            values={maxVals}
            onSelect={(value: string) => handleMaxChange(value)}
          />
        </Box>
      </Box>
    </Box>
  );
}
