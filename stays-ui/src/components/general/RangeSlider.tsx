import { Box, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import React from "react";
import { useUpdateEffect } from "react-use";

import { Range } from "../../models";
import ValueSelect from "./ValueSelect";

export interface RangeSelectProps {
  default: Range | undefined;
  range: Range;
  label: string;
  sx?: any;
  prefix?: string;
  suffix?: string;
  step: number;
  onChange: (min: string, max: string) => void;
}

export default function RangeSlider(props: RangeSelectProps) {
  const [max, setMax] = React.useState(props.default?.min ?? props.range.min);
  const [min, setMin] = React.useState(props.default?.max ?? props.range.max);
  const [value, setValue] = React.useState<number[]>([
    interpolate(props.default?.min ?? props.range.min, props.range, { min: 0, max: 100 }),
    interpolate(props.default?.max ?? props.range.max, props.range, { min: 0, max: 100 })
  ]);

  function interpolate(val: number, range1: Range, range2: Range) {
    const r1 = range1.max - range1.min;
    const r2 = range2.max - range2.min;
    const r3 = val - range1.min;
    if (r1 === 0 || r2 === 0 || r3 === 0) {
      return range2.min;
    }
    return (r3 * r2) / r1 + range2.min;
  }

  function getValueRange(value: number | number[]): Range {
    const v = value as number[];
    const vMin = v[0] <= v[1] ? v[0] : v[1];
    const vMax = v[0] >= v[1] ? v[0] : v[1];
    const iMin = interpolate(vMin, { min: 0, max: 100 }, props.range);
    const iMax = interpolate(vMax, { min: 0, max: 100 }, props.range);
    return { min: iMin, max: iMax };
  }

  function valuetext(value: number) {
    const prefix = props.prefix ?? "";
    const suffix = props.suffix ?? "";
    const iValue = Math.round(interpolate(value, { min: 0, max: 100 }, props.range));
    if (iValue === props.range.max) {
      return "" + prefix + iValue + suffix + "+";
    }
    return "" + prefix + iValue + suffix;
  }

  function handleChange(event: Event, newValue: number | number[]) {
    setValue(newValue as number[]);
    const vRange = getValueRange(newValue);
    setMin(vRange.min);
    setMax(vRange.max);
  }

  function handleChangeCommited(newValue: number | number[]) {
    const vRange = getValueRange(newValue);
    props.onChange(vRange.min.toString(), vRange.max.toString());
  }

  return (
    <Box sx={props.sx}>
      <Box sx={{ display: "flex", mt: 3 }}>
        <Slider
          getAriaLabel={() => "Range"}
          value={value}
          onChange={handleChange}
          onChangeCommitted={(e, newValue) => {
            handleChangeCommited(newValue);
          }}
          valueLabelDisplay="on"
          valueLabelFormat={(value) => (
            <Typography variant="caption">{valuetext(value)}</Typography>
          )}
          getAriaValueText={valuetext}
          marks
          min={0}
          max={100}
          step={interpolate(props.step, props.range, { min: 0, max: 100 })}
        />
      </Box>
    </Box>
  );
}
