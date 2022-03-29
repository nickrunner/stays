import { Box, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { Range } from "../../models";
import ValueSelect from "./ValueSelect";

export interface RangeSelectProps {
  default: Range | undefined;
  vals: string[];
  label: string;
  sx: any;
  onChange: (min: string, max: string) => void;
}

export default function RangeSelect(props: RangeSelectProps) {
  const [minVals, setMinVals] = React.useState(["None", ...props.vals]);
  const [maxVals, setMaxVals] = React.useState(["None", ...props.vals]);
  const [min, setMin] = React.useState(
    props.default
      ? props.default.min
        ? props.default.min.toString() == "0"
          ? "None"
          : props.default.min.toString()
        : "None"
      : "None"
  );
  const [max, setMax] = React.useState(
    props.default
      ? props.default.max
        ? props.default.max.toString() == "0"
          ? "None"
          : props.default.max.toString()
        : "None"
      : "None"
  );

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
    if (value != min) {
      setMin(value);
    }
  }

  function handleMaxChange(value: string) {
    console.log("handleing max change: " + max + " value: " + value);
    if (value != max) {
      setMax(value);
    }
  }

  useUpdateEffect(() => {
    setMinVals(getMinVals(max));
    props.onChange(min, max);
    console.log("max change");
    return;
  }, [max]);

  useUpdateEffect(() => {
    setMaxVals(getMaxVals(min));
    props.onChange(min, max);
    return;
  }, [min]);

  return (
    <Box sx={props.sx}>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        {props.label}
      </Typography>
      <Box sx={{ display: "flex", gap: 0.5 }}>
        <Box sx={{ width: "50%" }}>
          <ValueSelect
            label="Min"
            default={min}
            values={minVals}
            onSelect={(value: string) => handleMinChange(value)}
          />
        </Box>

        <Box sx={{ mt: 1, p: 1 }}>
          <Typography>-</Typography>
        </Box>
        <Box sx={{ width: "50%" }}>
          <ValueSelect
            label="Max"
            default={max}
            values={maxVals}
            onSelect={(value: string) => handleMaxChange(value)}
          />
        </Box>
      </Box>
    </Box>
  );
}
