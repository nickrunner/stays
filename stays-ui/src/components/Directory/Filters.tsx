import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { StateClient } from "../../clients/stateClient";
import { StaySearchFilter } from "../../models";
import { StayAttributeType } from "../../models";
import { Range } from "../../models";
import RangeSlider from "../general/RangeSlider";
import SectionDivider from "../general/SectionDivider";
import SectionSub from "../general/SectionSub";
import LocationFilter from "./LocationFilter";
import { StayAttributeChecklist } from "./StayAttributeChecklist";

export interface DirectoryFilterProps {
  filter: StaySearchFilter;
  onChange: (filter: StaySearchFilter) => void;
}

export default function Filters(props: DirectoryFilterProps) {
  const [filter, setFilter] = React.useState<StaySearchFilter>(props.filter);

  function getRangeCount(range: Range | undefined): number {
    let count = 0;
    if (!range) {
      return count;
    }
    if (range.min) {
      count++;
    }
    if (range.max) {
      count++;
    }
    return count;
  }

  function handlePropertyTypeChange(value: string[]) {
    console.log("TYPE CHANGE: " + value);
    setFilter({ ...filter, type: value.length > 0 ? value : undefined });
  }

  function handleAmenitiesChange(value: string[]) {
    console.log("AMENITIES: " + value);
    setFilter({ ...filter, amenities: value.length > 0 ? value : undefined });
  }

  function handleSpecialInterestChange(value: string[]) {
    console.log("SPECIAL INTEREST CHANGE: " + value);
    setFilter({ ...filter, specialInterests: value.length > 0 ? value : undefined });
  }

  function handleLocationChange(regions: string[], states: string[], cities: string[]) {
    setFilter({ ...filter, regions: regions, states: states, cities: cities });
  }

  function handleRateChange(min: string, max: string) {
    const range = getRange(min, max);
    if (range != filter.rate) {
      console.log("RATE CHANGE: " + min + "-" + max);
      setFilter({ ...filter, rate: range });
    }
  }

  function handleCapacityChange(min: string, max: string) {
    console.log("CAPACITY CHANGE: " + min + "-" + max);
    setFilter({ ...filter, capacity: getRange(min, max) });
  }

  function handleParkingChange(value: boolean) {
    console.log("PARKING CHANGE: " + value);
    setFilter({ ...filter, onSiteParking: value ?? undefined });
  }

  function handlePetsChange(value: boolean) {
    console.log("PETS CHANGE: " + value);
    setFilter({ ...filter, petsAllowed: value ?? undefined });
  }

  function getRange(min: string, max: string): Range {
    min = min.replace(/\D/g, "");
    max = max.replace(/\D/g, "");

    return {
      min: min == "None" ? 0 : Number(min),
      max: max == "None" ? 10000 : Number(max)
    };
  }

  useUpdateEffect(() => {
    props.onChange(filter);
    return;
  }, [filter]);

  const MAIN_GAP = 5;
  const SUB_GAP = 3;
  return (
    <Box
      sx={{
        display: "grid",
        justifyContent: "center",
        gap: MAIN_GAP,
        p: 3
      }}>
      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>Price</SectionSub>
        <RangeSlider
          sx={{ px: 2 }}
          label="Nightly Rate"
          range={{ min: 0, max: 600 }}
          default={props.filter.rate}
          prefix="$"
          step={50}
          onChange={(min: string, max: string) => {
            handleRateChange(min, max);
          }}
        />
      </Box>

      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>Travelers</SectionSub>
        <RangeSlider
          sx={{ px: 2 }}
          label="Capacity"
          range={{ min: 0, max: 10 }}
          default={props.filter.capacity}
          step={1}
          onChange={(min: string, max: string) => {
            handleCapacityChange(min, max);
          }}
        />
      </Box>

      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>Unique Stays</SectionSub>
        <StayAttributeChecklist
          type={StayAttributeType.PropertyType}
          default={filter.type ?? []}
          onChange={(attributes) => handlePropertyTypeChange(attributes)}
        />
      </Box>
      <SectionDivider />

      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>Experiences</SectionSub>
        <StayAttributeChecklist
          type={StayAttributeType.SpecialInterest}
          default={filter.specialInterests ?? []}
          onChange={(attributes) => handleSpecialInterestChange(attributes)}
        />
      </Box>
      <SectionDivider />
      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>Regions</SectionSub>
        <LocationFilter
          defaultRegions={filter.regions}
          defaultStates={filter.states}
          defaultCities={filter.cities}
          onChange={(regions, states, cities) => {
            handleLocationChange(regions, states, cities);
          }}
        />
      </Box>
      <SectionDivider />
      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>Amenities</SectionSub>
        <StayAttributeChecklist
          type={StayAttributeType.Amenity}
          default={filter.specialInterests ?? []}
          onChange={(attributes) => handleAmenitiesChange(attributes)}
        />
      </Box>
      <Box sx={{ display: "grid", gap: SUB_GAP }}>
        <SectionSub>More Filters</SectionSub>
        <FormControlLabel
          defaultChecked={props.filter.onSiteParking ?? false}
          control={<Checkbox />}
          label="On-Site Parking Available"
          onChange={(e, checked) => handleParkingChange(checked)}
        />
        <FormControlLabel
          defaultChecked={props.filter.petsAllowed ?? false}
          control={<Checkbox />}
          label="Must Allow Pets"
          onChange={(e, checked) => handlePetsChange(checked)}
        />
      </Box>
    </Box>
  );
}
