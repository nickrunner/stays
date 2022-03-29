import { Box, Typography } from "@mui/material";
import React from "react";
import { useUpdate, useUpdateEffect } from "react-use";

import { StateClient } from "../../clients/stateClient";
import { StayClient } from "../../clients/stayClient";
import Checklist from "../general/Checklist";
import SectionDivider from "../general/SectionDivider";
import { RegionChecklist } from "./RegionChecklist";

export interface LocationFilterProps {
  defaultRegions?: string[];
  defaultStates?: string[];
  defaultCities?: string[];
  onChange: (regions: string[], states: string[], cities: string[]) => void;
}
export default function LocationFilter(props: LocationFilterProps) {
  const [regions, setRegions] = React.useState<string[]>(props.defaultRegions ?? []);
  const [states, setStates] = React.useState<string[]>(props.defaultStates ?? []);
  const [cities, setCities] = React.useState<string[]>(props.defaultCities ?? []);

  function handleRegionChange(regions: string[]) {
    setRegions(regions);
  }

  function handleStatesChange(states: string[]) {
    setStates(states);
  }

  useUpdateEffect(() => {
    props.onChange(regions, states, cities);
    return;
  }, [regions, states, cities]);

  async function getStates() {
    const newStates = await new StateClient().listStates(regions);
    setStates(newStates);
  }

  return (
    <Box>
      <RegionChecklist
        default={props.defaultRegions ?? []}
        onChange={(regions) => handleRegionChange(regions)}
      />
    </Box>
  );
}
