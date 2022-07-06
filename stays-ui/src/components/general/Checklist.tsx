import { Box, Checkbox, Grid, MenuItem, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { theme } from "../../Theme";

function getStyles(item: string, selected: string[] | undefined) {
  if (!selected) {
    return;
  }
  return {
    bgcolor: "primary.main",
    fontWeight:
      selected.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightBold
  };
}

export interface ChecklistItem {
  icon?: React.ReactElement;
  label: string;
}

export interface ChecklistProps {
  items: ChecklistItem[];
  default: string[];
  sx?: SxProps<Theme>;
  onChange: (values: string[]) => void;
}

export default function Checklist(props: ChecklistProps) {
  const [values, setValues] = React.useState(props.default);

  function handleChange(value: string, checked: boolean) {
    console.log("Value: " + value + " Checked: " + checked);
    if (checked) {
      setValues([...values, value]);
    } else {
      setValues(values.filter((v) => v != value));
    }
  }

  useUpdateEffect(() => {
    props.onChange(values);
    return;
  }, [values]);

  return (
    <Box sx={props.sx}>
      <Typography sx={{ mb: 3 }} variant="subtitle2">
        Select Multiple
      </Typography>
      <Grid container spacing={1} sx={{ width: "100%" }}>
        {props.items.map((item: ChecklistItem) => (
          <Grid key={item.label} item sx={{ width: "100%" }}>
            <MenuItem
              onClick={() => {
                handleChange(item.label, !values.includes(item.label));
              }}
              key={item.label}
              value={item.label}
              style={getStyles(item.label, values)}>
              <Box sx={{ width: "20%" }}>{item.icon}</Box>
              <Box sx={{ width: "60%" }}>
                <Typography variant="body1" style={getStyles(item.label, values)}>
                  {item.label}
                </Typography>
              </Box>
              <Box sx={{ width: "20%" }}>
                <Checkbox
                  defaultChecked={props.default.includes(item.label)}
                  checked={values.includes(item.label)}
                />
              </Box>
            </MenuItem>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
