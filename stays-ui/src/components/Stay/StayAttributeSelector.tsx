import { Box, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import React from "react";

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

  React.useEffect(() => {
    getStayAttributes();
    return;
  }, []);

  function handleAttributeChange(type: StayAttributeType, event: SelectChangeEvent<string[]>) {
    const {
      target: { value }
    } = event;
    const newAttributes: string[] = typeof value === "string" ? value.split(",") : value;
    setSelectedAttributes(newAttributes);
    props.onChange(newAttributes);
  }

  return (
    <Select
      required
      label={props.label}
      sx={props.sx}
      multiple
      value={selectedAttributes}
      defaultValue={selectedAttributes}
      onChange={(e) => handleAttributeChange(StayAttributeType.PropertyType, e)}
      input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value: any) => (
            <Chip key={value} label={value} />
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
            {attr.name}
          </MenuItem>
        );
      })}
    </Select>
  );
}
