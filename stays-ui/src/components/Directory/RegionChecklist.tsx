import { Avatar } from "@mui/material";
import React from "react";

import { StayClient } from "../../clients/stayClient";
import { content } from "../../content";
import { StayAttributeRecord, StayAttributeType } from "../../models";
import Checklist from "../general/Checklist";
import StayAttributeIcon from "../general/StayAttributeIcon";

export interface RegionChecklistProps {
  default: string[];
  sx?: any;
  onChange: (regions: string[]) => void;
}

export function RegionChecklist(props: RegionChecklistProps) {
  const [regions, setRegions] = React.useState<StayAttributeRecord[]>([]);

  async function getRegions() {
    const r = await new StayClient().getStayAttributes(StayAttributeType.Region);
    setRegions(r);
  }

  React.useEffect(() => {
    getRegions();
    return;
  }, []);

  return (
    <Checklist
      sx={props.sx}
      default={props.default}
      onChange={(regions) => {
        props.onChange(regions);
      }}
      items={regions.map((r) => {
        return {
          label: r.name,
          icon: <StayAttributeIcon type={StayAttributeType.Region} name={r.name} />
        };
      })}
    />
  );
}
