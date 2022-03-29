import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { StayClient } from "../../clients/stayClient";
import { StayAttribute, StayAttributeRecord, StayAttributeType } from "../../models";
import { theme } from "../../Theme";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
function getStyles(item: string, selected: string[] | undefined) {
  if (!selected) {
    return;
  }
  return {
    fontWeight:
      selected.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

export type StayAttributeSelectorProps = {
  type: StayAttributeType;
  selected: string[];
  label: string;
  onChange: (attributes: string[]) => void;
  sx?: any;
};

export default function StayAttributeSelector(props: StayAttributeSelectorProps) {
  const [attributes, setAttributes] = React.useState<StayAttributeRecord[]>([]);
  const [selectedAttributes, setSelectedAttributes] = React.useState<string[]>(props.selected);

  const getStayAttributes = async () => {
    const pt: StayAttributeRecord[] = await new StayClient().getStayAttributes(props.type);
    setAttributes(pt);
  };

  function handleDelete(e: any, value: any) {
    console.log("Handle Delete: ", { value });
    setSelectedAttributes((selectedAttributes) =>
      selectedAttributes.filter((attr) => attr !== value)
    );
  }

  useUpdateEffect(() => {
    props.onChange(selectedAttributes);
    return;
  }, [selectedAttributes]);

  React.useEffect(() => {
    getStayAttributes();
    return;
  }, []);

  function handleAttributeChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value }
    } = event;
    const newAttributes: string[] = typeof value === "string" ? value.split(",") : value;
    setSelectedAttributes(newAttributes);
  }

  return (
    <div>
      <FormControl variant="outlined" sx={props.sx}>
        <InputLabel id="test-label">{props.label}</InputLabel>
        <Select
          sx={{ labelWidth: 200 }}
          key={props.label}
          required
          labelId="test-label"
          label={props.label}
          multiple
          value={selectedAttributes}
          defaultValue={selectedAttributes}
          onChange={(e) => handleAttributeChange(e)}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={(event) => handleDelete(event, value)}
                  onMouseDown={(event) => {
                    event.stopPropagation();
                  }}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}>
          {attributes.map((attr: StayAttribute) => {
            return (
              <MenuItem
                key={attr.name}
                value={attr.name}
                style={getStyles(attr.name, selectedAttributes)}>
                <Checkbox checked={selectedAttributes.includes(attr.name)} />
                {attr.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
