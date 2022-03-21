import { Filter } from "@material-ui/icons";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import BedIcon from "@mui/icons-material/Bed";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import FilterIcon from "@mui/icons-material/FilterAlt";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PeopleIcon from "@mui/icons-material/People";
import {
  Accordion,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
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
import StayAttributeSelector from "../Stay/StayAttributeSelector";
import FilterAccordion from "./FilterAccordion";

export interface DirectoryFilterProps {
  filter: StaySearchFilter;
  onChange: (filter: StaySearchFilter) => void;
}

export default function DirectoryFilter(props: any) {
  const [filter, setFilter] = React.useState<StaySearchFilter>(props.filter);
  const [availableCities, setAvailableCities] = React.useState<string[]>([]);
  const [availableStates, setAvailableStates] = React.useState<string[]>([]);

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
    setFilter({ ...filter, onSiteParking: value });
  }

  function handlePetsChange(value: boolean) {
    console.log("PETS CHANGE: " + value);
    setFilter({ ...filter, petsAllowed: value });
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
    console.log("Filter: " + JSON.stringify(filter, null, 2));
    props.onChange(filter);
    return;
  }, [filter]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ display: "flex", p: 0 }}>
          <FilterIcon sx={{ color: "primary.main", m: 2.5, ml: 5 }} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Filter Results
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FilterAccordion
            header="By Features"
            icon={<DownhillSkiingIcon sx={{ color: "primary.main" }} />}>
            <InputLabel id="propertyTypeLabel">Property Type</InputLabel>
            <StayAttributeSelector
              sx={{ width: "100%" }}
              type={StayAttributeType.PropertyType}
              label="Property Type"
              selected={[]}
              onChange={(attributes) => {
                handlePropertyTypeChange(attributes);
              }}
            />

            <InputLabel id="amenitiesLabel">Amenities</InputLabel>
            <StayAttributeSelector
              sx={{ width: "100%" }}
              type={StayAttributeType.Amenity}
              label="Amenitities"
              selected={[]}
              onChange={(attributes) => {
                handleAmenitiesChange(attributes);
              }}
            />

            <InputLabel id="specialInterestsLabel">Special Interests</InputLabel>
            <StayAttributeSelector
              sx={{ width: "100%" }}
              type={StayAttributeType.SpecialInterest}
              label="Special Interests"
              selected={[]}
              onChange={(attributes) => {
                handleSpecialInterestChange(attributes);
              }}
            />
          </FilterAccordion>
        </Grid>

        <Grid item xs={12}>
          <FilterAccordion
            header="By Location"
            icon={<LocationSearchingIcon sx={{ color: "primary.main" }} />}>
            <InputLabel id="regionLabel">Stays Region</InputLabel>
            <StayAttributeSelector
              sx={{ width: "100%" }}
              type={StayAttributeType.Region}
              label="Region"
              selected={[]}
              onChange={(attributes) => {
                handleRegionChange(attributes);
              }}
            />

            <InputLabel id="stateLabel">State/Province</InputLabel>
            <AttributeSelector
              sx={{ width: "100%" }}
              attributes={availableStates}
              label="State"
              selected={[]}
              onChange={(attributes) => {
                handleStateChange(attributes);
              }}
            />
            <InputLabel id="cityZipLabel">City</InputLabel>
            <AttributeSelector
              sx={{ width: "100%" }}
              label="City"
              attributes={availableCities}
              selected={[]}
              onChange={(attributes) => {
                handleCityChange(attributes);
              }}
            />
          </FilterAccordion>
        </Grid>

        <Grid item xs={12}>
          <FilterAccordion
            header="By Price"
            icon={<AttachMoneyIcon sx={{ color: "primary.main" }} />}>
            <RangeSelect
              sx={{ width: "100%" }}
              label="Nightly Rate"
              vals={["$100", "$200", "$300", "$400", "$500", "$600"]}
              defaultMin={"None"}
              defaultMax={"None"}
              onChange={(min: string, max: string) => {
                handleRateChange(min, max);
              }}
            />
          </FilterAccordion>
        </Grid>
        <Grid item xs={12}>
          <FilterAccordion
            header="By Number of Guests"
            icon={<PeopleIcon sx={{ color: "primary.main" }} />}>
            <RangeSelect
              sx={{ width: "100%" }}
              label="Capacity"
              vals={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              defaultMin={"None"}
              defaultMax={"None"}
              onChange={(min: string, max: string) => {
                handleCapacityChange(min, max);
              }}
            />
          </FilterAccordion>
        </Grid>
        <Grid item xs={12}>
          <FilterAccordion header="By Beds" icon={<BedIcon sx={{ color: "primary.main" }} />}>
            <RangeSelect
              sx={{ width: "100%" }}
              label="Bedrooms"
              vals={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
              defaultMin={"None"}
              defaultMax={"None"}
              onChange={(min: string, max: string) => {
                handleBedroomChange(min, max);
              }}
            />
          </FilterAccordion>
        </Grid>

        <Grid item xs={12}>
          <FilterAccordion
            header="More Filters"
            icon={<MoreVertIcon sx={{ color: "primary.main" }} />}>
            <FormControlLabel
              control={<Checkbox />}
              label="Pets Allowed?"
              onChange={(e, checked) => handlePetsChange(checked)}
            />

            <FormControlLabel
              control={<Checkbox />}
              label="On-Site Parking Available"
              onChange={(e, checked) => handleParkingChange(checked)}
            />
          </FilterAccordion>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
