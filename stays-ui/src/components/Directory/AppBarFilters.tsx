import { MonetizationOn } from "@material-ui/icons";
import { Cabin, RoomService, TravelExplore } from "@mui/icons-material";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { StaySearchFilter } from "../../models";
import { StayAttributeType } from "../../models";
import { Range } from "../../models";
import RangeSlider from "../general/RangeSlider";
import SearchBar from "../general/SearchBar";
import FilterPopover from "./FilterPopover";
import LocationFilter from "./LocationFilter";
import { StayAttributeChecklist } from "./StayAttributeChecklist";

export interface DirectoryFilterProps {
  filter: StaySearchFilter;
  onChange: (filter: StaySearchFilter) => void;
}

export default function AppBarFilters(props: DirectoryFilterProps) {
  const [filter, setFilter] = React.useState<StaySearchFilter>(props.filter);

  function getLocCount(): number {
    return (
      (filter.regions?.length ?? 0) + (filter.states?.length ?? 0) + (filter.cities?.length ?? 0)
    );
  }

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

  function getMoreCount(): number {
    return (filter.onSiteParking ? 1 : 0) + (filter.petsAllowed ? 1 : 0);
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

  function handleBedroomChange(min: string, max: string) {
    console.log("BEDROOM CHANGE: " + min + "-" + max);
    setFilter({ ...filter, bedrooms: getRange(min, max) });
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

  return (
    <Box
      sx={{
        display: { xs: "none", lg: "flex" },
        justifyContent: "space-between",
        width: "100%",
        px: 5,
        pt: 2,
        pb: 2,
        margin: "auto"
      }}>
      <Box
        sx={{
          mt: 1.5,
          gap: 1,
          width: "100%",
          justifyContent: "center",
          display: "flex"
        }}>
        <FilterPopover
          width={500}
          onClear={() => {
            console.log("clear");
          }}
          header={filter.type ? "Unique Stays (" + filter.type.length + ")" : "Unique Stays (0)"}
          icon={<Cabin sx={{ color: "primary.main" }} />}>
          <StayAttributeChecklist
            type={StayAttributeType.PropertyType}
            default={filter.type ?? []}
            onChange={(attributes) => handlePropertyTypeChange(attributes)}
          />
        </FilterPopover>

        <FilterPopover
          width={500}
          onClear={() => {
            console.log("clear");
          }}
          header={
            filter.specialInterests
              ? "Experiences (" + filter.specialInterests.length + ")"
              : "Experiences (0)"
          }
          icon={<DownhillSkiingIcon sx={{ color: "primary.main" }} />}>
          <StayAttributeChecklist
            type={StayAttributeType.SpecialInterest}
            default={filter.specialInterests ?? []}
            onChange={(attributes) => handleSpecialInterestChange(attributes)}
          />
        </FilterPopover>
        <FilterPopover
          width={500}
          onClear={() => {
            handleLocationChange([], [], []);
          }}
          header={"Regions (" + getLocCount() + ")"}
          icon={<TravelExplore sx={{ color: "primary.main" }} />}>
          <LocationFilter
            defaultRegions={filter.regions}
            defaultStates={filter.states}
            defaultCities={filter.cities}
            onChange={(regions, states, cities) => {
              handleLocationChange(regions, states, cities);
            }}
          />
        </FilterPopover>
        <FilterPopover
          onClear={() => {
            handleRateChange("None", "None");
          }}
          header={
            filter.rate
              ? "Price (" + filter.rate?.min.toString() + "-" + filter.rate?.max.toString() + ")"
              : "Price (any)"
          }
          icon={<MonetizationOn />}>
          <RangeSlider
            sx={{ width: "100%" }}
            label="Nightly Rate"
            range={{ min: 0, max: 600 }}
            default={props.filter.rate}
            prefix="$"
            step={50}
            onChange={(min: string, max: string) => {
              handleRateChange(min, max);
            }}
          />
        </FilterPopover>

        <FilterPopover
          onClear={() => {
            handleCapacityChange("None", "None");
            handleBedroomChange("None", "None");
          }}
          header={
            props.filter.capacity ? "Travelers (" + props.filter.capacity?.max + ")" : "Travelers"
          }
          icon={<PeopleIcon sx={{ color: "primary.main" }} />}>
          <RangeSlider
            sx={{ width: "100%" }}
            label="Capacity"
            range={{ min: 0, max: 10 }}
            default={props.filter.capacity}
            step={1}
            onChange={(min: string, max: string) => {
              handleCapacityChange(min, max);
            }}
          />
        </FilterPopover>

        <FilterPopover
          width={500}
          onClear={() => {
            console.log("clear");
          }}
          icon={<RoomService />}
          header={
            filter.amenities ? "Amenities (" + filter.amenities.length + ")" : "Amenities (0)"
          }>
          <StayAttributeChecklist
            type={StayAttributeType.Amenity}
            default={filter.specialInterests ?? []}
            onChange={(attributes) => handleAmenitiesChange(attributes)}
          />
        </FilterPopover>

        <FilterPopover
          onClear={() => {
            handlePetsChange(false);
            handleParkingChange(false);
          }}
          header={"More (" + getMoreCount() + ")"}
          icon={<MoreVertIcon sx={{ color: "primary.main" }} />}>
          <FormControlLabel
            defaultChecked={props.filter.petsAllowed ?? false}
            control={<Checkbox />}
            label="Must Allow Pets"
            onChange={(e, checked) => handlePetsChange(checked)}
          />

          <FormControlLabel
            defaultChecked={props.filter.onSiteParking ?? false}
            control={<Checkbox />}
            label="Must have on-site parking"
            onChange={(e, checked) => handleParkingChange(checked)}
          />
        </FilterPopover>
      </Box>
    </Box>
  );
}
