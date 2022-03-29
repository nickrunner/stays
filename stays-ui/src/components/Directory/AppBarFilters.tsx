import { Filter, LocationCity, MonetizationOn } from "@material-ui/icons";
import { Cabin, TravelExplore } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedIcon from "@mui/icons-material/Bed";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import FilterIcon from "@mui/icons-material/FilterAlt";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleIcon from "@mui/icons-material/People";
import { TabContext, TabList } from "@mui/lab";
import {
  Accordion,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  Tab,
  Tabs,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import { useUpdateEffect } from "react-use";

import { StateClient } from "../../clients/stateClient";
import { StayClient } from "../../clients/stayClient";
import { StaySearchFilter } from "../../models";
import { StayAttributeType } from "../../models";
import { Range } from "../../models";
import AttributeSelector from "../general/AttributeSelector";
import RangeSelect from "../general/RangeSelect";
import RangeSlider from "../general/RangeSlider";
import StayAttributeSelector from "../Stay/StayAttributeSelector";
import FilterPopover from "./FilterPopover";
import LocationFilter from "./LocationFilter";
import PropertyTypeTabs from "./PropertyTypeTabs";
import { RegionChecklist } from "./RegionChecklist";

export interface DirectoryFilterProps {
  filter: StaySearchFilter;
  onChange: (filter: StaySearchFilter) => void;
}

export default function AppBarFilters(props: DirectoryFilterProps) {
  const [filter, setFilter] = React.useState<StaySearchFilter>(props.filter);
  const [availableCities, setAvailableCities] = React.useState<string[]>([]);
  const [availableStates, setAvailableStates] = React.useState<string[]>([]);

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

  function getPriceCount(): number {
    return getRangeCount(filter.rate);
  }

  function getGuestCount(): number {
    return getRangeCount(filter.capacity) + getRangeCount(filter.bedrooms);
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

  async function handleRegionChange(value: string[]) {
    console.log("REGION CHANGE: " + value);
    setFilter({ ...filter, regions: value.length > 0 ? value : undefined });
    const states = await new StateClient().listStates(value);
    setAvailableStates(states);
  }

  async function handleStateChange(value: string[]) {
    console.log("STATE CHANGE: " + value);
    setFilter({ ...filter, states: value.length > 0 ? value : undefined });
    const cities = await new StateClient().listCitiesFromStates(value);
    setAvailableCities(cities);
  }

  function handleZipChange(value: string[]) {
    try {
      const zips = [];
      for (const val of value) {
        zips.push(Number(val));
      }
      setFilter({ ...filter, zips: zips });
    } catch {
      console.log("Invalid Zip");
    }
  }

  function handleCityChange(value: string[]) {
    console.log("CITY CHANGE: " + value);
    setFilter({ ...filter, cities: value.length > 0 ? value : undefined });
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

  const getStates = async () => {
    const states = await new StateClient().listStates(filter.regions);
    setAvailableStates(states);
  };

  function getRange(min: string, max: string): Range {
    min = min.replace(/\D/g, "");
    max = max.replace(/\D/g, "");

    return {
      min: min == "None" ? 0 : Number(min),
      max: max == "None" ? 10000 : Number(max)
    };
  }

  React.useEffect(() => {
    getStates();
  }, []);

  useUpdateEffect(() => {
    props.onChange(filter);
    return;
  }, [filter]);

  return (
    <Box
      sx={{
        display: "flex",
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
          display: { xs: "none", lg: "flex" }
        }}>
        <FilterPopover
          onClear={() => {
            console.log("clear");
          }}
          header="Unique Stays"
          icon={<Cabin sx={{ color: "primary.main" }} />}></FilterPopover>

        <FilterPopover
          onClear={() => {
            console.log("clear");
          }}
          header="Experiences"
          icon={<DownhillSkiingIcon sx={{ color: "primary.main" }} />}></FilterPopover>
        <FilterPopover
          width={500}
          onClear={() => {
            handleRegionChange([]);
            handleStateChange([]);
            handleCityChange([]);
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
          icon={<MonetizationOn sx={{ color: "primary.main" }} />}>
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
          onClear={() => {
            handlePetsChange(false);
            handleParkingChange(false);
          }}
          header={"More (" + getMoreCount() + ")"}
          icon={<MoreVertIcon sx={{ color: "primary.main" }} />}>
          <FormControlLabel
            defaultChecked={props.filter.petsAllowed ?? false}
            control={<Checkbox />}
            label="Pets Allowed?"
            onChange={(e, checked) => handlePetsChange(checked)}
          />

          <FormControlLabel
            defaultChecked={props.filter.onSiteParking ?? false}
            control={<Checkbox />}
            label="On-Site Parking Available"
            onChange={(e, checked) => handleParkingChange(checked)}
          />
          <Box sx={{ p: 2 }}>
            <StayAttributeSelector
              sx={{ minWidth: 150 }}
              type={StayAttributeType.Amenity}
              label="Amenitities"
              selected={props.filter.amenities ?? []}
              onChange={(attributes) => {
                handleAmenitiesChange(attributes);
              }}
            />
          </Box>
        </FilterPopover>
      </Box>
    </Box>
  );
}
