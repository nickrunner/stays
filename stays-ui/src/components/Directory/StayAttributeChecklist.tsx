import { Cabin, DownhillSkiing } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

import { StayClient } from "../../clients/stayClient";
import { content } from "../../content";
import { StayAttributeRecord, StayAttributeType } from "../../models";
import Checklist from "../general/Checklist";

export interface StayAttributeChecklistProps {
  type: StayAttributeType;
  default: string[];
  sx?: any;
  onChange: (attributes: string[]) => void;
}

export function StayAttributeChecklist(props: StayAttributeChecklistProps) {
  const [attributes, setAttributes] = React.useState<StayAttributeRecord[]>([]);

  async function getStayAttributes() {
    const pt: StayAttributeRecord[] = await new StayClient().getStayAttributes(props.type);
    setAttributes(pt);
  }

  function getIcon(name: string): React.ReactElement {
    switch (props.type) {
      case StayAttributeType.PropertyType:
        return <Cabin sx={{ color: "primary.main" }} />;
      case StayAttributeType.SpecialInterest:
        return <DownhillSkiing sx={{ color: "primary.main" }} />;
      default:
        return <DownhillSkiing sx={{ color: "primary.main" }} />;
    }
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
        props.onChange(attributes);
      }}
      items={attributes.map((attr) => {
        return {
          label: attr.name,
          icon: getIcon(attr.name)
        };
      })}
    />
  );
}
