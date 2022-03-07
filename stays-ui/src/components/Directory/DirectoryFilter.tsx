import { Filter } from "@material-ui/icons";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select
} from "@mui/material";
import React from "react";

import { StaySearchFilter } from "../../../../common/models/Stay";
import { StayAttributeType } from "../../../../common/models/StayAttributes";
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

  React.useEffect(() => {
    console.log("Filter: " + JSON.stringify(filter, null, 2));
    props.onChange(filter);
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
            vals={["$100", "$200", "$300", "$400", "$500", "$600+"]}
            defaultMin={"$100"}
            defaultMax={"$100"}
            onChange={function (min: string, max: string): void {
              console.log("Min: " + min + " Max: " + max);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RangeSelect
            sx={{ width: "100%" }}
            label="Capacity"
            vals={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]}
            defaultMin={"1"}
            defaultMax={"1"}
            onChange={function (min: string, max: string): void {
              console.log("Min: " + min + " Max: " + max);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <RangeSelect
            sx={{ width: "100%" }}
            label="Bedrooms"
            vals={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"]}
            defaultMin={"1"}
            defaultMax={"1"}
            onChange={function (min: string, max: string): void {
              console.log("Min: " + min + " Max: " + max);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox />}
            label="Pets Allowed?"
            onChange={(e, checked) => (filter.petsAllowed = checked)}
          />

          <FormControlLabel
            control={<Checkbox />}
            label="On-Site Parking Available"
            onChange={(e, checked) => (filter.onSiteParking = checked)}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
