import { Box, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

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

export type AttributeSelectorProps = {
  attributes: string[];
  selected: string[];
  label: string;
  onChange: (attributes: string[]) => void;
  sx?: any;
};

export default function AttributeSelector(props: AttributeSelectorProps) {
  const [selectedAttributes, setSelectedAttributes] = React.useState<string[]>(props.selected);

  function handleAttributeChange(event: SelectChangeEvent<string[]>) {
    const {
      target: { value }
    } = event;
    const newAttributes: string[] = typeof value === "string" ? value.split(",") : value;
    setSelectedAttributes(newAttributes);
  }

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

  return (
    <Select
      required
      label={props.label}
      sx={props.sx}
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
      {props.attributes.map((attr: string) => {
        return (
          <MenuItem key={attr} value={attr} style={getStyles(attr, selectedAttributes)}>
            {attr}
          </MenuItem>
        );
      })}
    </Select>
  );
}
