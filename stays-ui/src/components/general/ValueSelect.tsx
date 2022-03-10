import { MenuItem, Select } from "@mui/material";

export interface ValueSelectProps {
  values: string[];
  label: string;
  default: string;
  onSelect: (value: string) => void;
}

export default function ValueSelect(props: ValueSelectProps) {
  return (
    <Select
      fullWidth={true}
      defaultValue={props.default}
      labelId={props.label}
      onChange={(event: any) => props.onSelect(event.target.value.toString())}>
      {props.values.map((v: string) => {
        return (
          <MenuItem key={v} value={v}>
            {v}
          </MenuItem>
        );
      })}
    </Select>
  );
}
