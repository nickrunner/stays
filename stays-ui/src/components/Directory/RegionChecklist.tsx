import { Avatar } from "@mui/material";
import React from "react";

import { StayClient } from "../../clients/stayClient";
import { content } from "../../content";
import { StayAttributeRecord, StayAttributeType } from "../../models";
import Checklist from "../general/Checklist";

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

  function getAvatar(region: string) {
    switch (region) {
      case "Coastal":
        return content.images.regions.coastal;
      case "Midwest":
        return content.images.regions.midwest;
      case "Northeast":
        return content.images.regions.northeast;
      case "Pacific Northwest":
        return content.images.regions.pnw;
      case "Southern":
        return content.images.regions.southern;
      case "Southwest":
        return content.images.regions.southwest;
      case "Western":
        return content.images.regions.western;
      default:
        return content.images.regions.american;
    }
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
          icon: (
            <Avatar
              sx={{ height: "30px", width: "30px" }}
              aria-label="stay"
              src={getAvatar(r.name)}
            />
          )
        };
      })}
    />
  );
}
