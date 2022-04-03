import { Cabin, DownhillSkiing } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

import { StayClient } from "../../clients/stayClient";
import { content } from "../../content";
import { StayAttributeRecord, StayAttributeType } from "../../models";
import Checklist from "../general/Checklist";
import StayAttributeIcon from "../general/StayAttributeIcon";

export interface StayAttributeChecklistProps {
  type: StayAttributeType;
  default: string[];
  sx?: any;
  onChange: (attributes: string[]) => void;
}

export function StayAttributeChecklist(props: StayAttributeChecklistProps) {
  const [attributes, setAttributes] = React.useState<StayAttributeRecord[]>([]);
  const [selectedAttributes, setSelectedAttributes] = React.useState<string[]>(props.default);

  async function getStayAttributes() {
    const pt: StayAttributeRecord[] = await new StayClient().getStayAttributes(props.type);
    setAttributes(pt);
  }

  function handleChange(newSelectedAttributes: string[]) {
    setSelectedAttributes(newSelectedAttributes);
    props.onChange(newSelectedAttributes);
  }

  React.useEffect(() => {
    getStayAttributes();
    return;
  }, []);

  return (
    <Checklist
      sx={props.sx}
      default={props.default}
      onChange={(attributes) => {
        handleChange(attributes);
      }}
      items={attributes.map((attr) => {
        return {
          label: attr.name,
          icon: (
            <StayAttributeIcon
              sx={{
                color: selectedAttributes.includes(attr.name) ? "primary.main" : "primary.dark"
              }}
              type={props.type}
              name={attr.name}
            />
          )
        };
      })}
    />
  );
}
