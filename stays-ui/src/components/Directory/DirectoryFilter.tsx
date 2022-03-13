import { Filter } from "@material-ui/icons";
import { Checkbox, FormControlLabel, Grid, InputLabel } from "@mui/material";
import React from "react";

import { StaySearchFilter } from "../../models";
import { StayAttributeType } from "../../models";
import { Range } from "../../models";
import RangeSelect from "../general/RangeSelect";
import StayAttributeSelector from "../Stay/StayAttributeSelector";

export interface DirectoryFilterProps {
  filter: StaySearchFilter;
  onChange: (filter: StaySearchFilter) => void;
}

export default function DirectoryFilter(props: any) {
  const [filter, setFilter] = React.useState<StaySearchFilter>(props.filter);

  function handlePropertyTypeChange(value: string[]) {
    setFilter({ ...filter, type: value });
  }

  function handleAmenitiesChange(value: string[]) {
    setFilter({ ...filter, amenities: value });
  }

  function handleSpecialInterestChange(value: string[]) {
    setFilter({ ...filter, specialInterests: value });
  }

  function getRange(min: string, max: string): Range {
    min = min.replace(/\D/g, "");
    max = max.replace(/\D/g, "");
    if (min === "None") {
      min = "0";
    }
    if (max === "None") {
      max = "10000";
    }
    return { min: Number(min), max: Number(max) };
  }

  function handleRateChange(min: string, max: string) {
    setFilter({ ...filter, rate: getRange(min, max) });
  }

  function handleBedroomChange(min: string, max: string) {
    setFilter({ ...filter, bedrooms: getRange(min, max) });
  }

  function handleCapacityChange(min: string, max: string) {
    setFilter({ ...filter, capacity: getRange(min, max) });
  }

  function handleParkingChange(value: boolean) {
    setFilter({ ...filter, onSiteParking: value });
  }

  function handlePetsChange(value: boolean) {
    setFilter({ ...filter, petsAllowed: value });
  }

  React.useEffect(() => {
    console.log("Filter: " + JSON.stringify(filter, null, 2));
    props.onChange(filter);
    return;
  }, [filter]);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
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
        </Grid>

        <Grid item xs={15}>
          <RangeSelect
            sx={{ width: "100%" }}
            label="Nightly Rate"
            vals={["$100", "$200", "$300", "$400", "$500", "$600"]}
            defaultMin={"None"}
            defaultMax={"None"}
            onChange={function (min: string, max: string): void {
              handleRateChange(min, max);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RangeSelect
            sx={{ width: "100%" }}
            label="Capacity"
            vals={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            defaultMin={"None"}
            defaultMax={"None"}
            onChange={function (min: string, max: string): void {
              handleBedroomChange(min, max);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RangeSelect
            sx={{ width: "100%" }}
            label="Bedrooms"
            vals={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            defaultMin={"None"}
            defaultMax={"None"}
            onChange={function (min: string, max: string): void {
              handleCapacityChange(min, max);
            }}
          />
        </Grid>

        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
