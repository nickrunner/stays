import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormGroup, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import CurrencyTextField from '../CurrencyTextField';

export default function StayInfoForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Stay Information
      </Typography>
      <FormGroup>
      <Grid container spacing={3}>
        <Grid item xs={12}>

        <FormControl sx={{mt:1, width:"65%" }}>
          <TextField
            required
            id="name"
            name="name"
            label="Stay Name"
          />
          </FormControl>
          <FormControl sx={{ ml: 1, mt:1, width:"25%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Current Rate</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
          </FormControl>
          
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Description of Stay"
            fullWidth

            multiline
            rows={5}
          />
        </Grid>
        <Grid item xs={12}>
            
            <FormControl >
            <InputLabel id="capacityLabel">Guest Capacity</InputLabel>
            <Select
                sx={{width:150, mr:1}}
                labelId="capacityLabel"
                id="capacitySelect"
                label="Guest Capacity"
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10+</MenuItem>
            </Select>
            </FormControl>
            <FormControl >
            <InputLabel id="bedroomsLabel">Bedrooms</InputLabel>
            <Select
                required
                sx={{width:150, mr:1}}
                labelId="bedroomsLabel"
                id="bedroomsSelect"
                label="Bedrooms"
            >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10+</MenuItem>
            </Select>
            </FormControl>
        </Grid>
        
        <Grid item xs={12}>

            <FormControl>
            <InputLabel id="propertyTypeLabel">Property Type</InputLabel>
            <Select
                required
                sx={{width:150, mr:1}}
                labelId="propertyTypeLabel"
                id="propertyTypeSelect"
                label="Property Type"
            >
                <MenuItem>Cabin/Cottage</MenuItem>
                <MenuItem>A-Frame</MenuItem>
            </Select>
            </FormControl>

            <FormControl sx={{width:150, mr:1}}>
            <InputLabel id="amenitiesLabel">Amenities</InputLabel>
            <Select
                labelId="amenitiesLabel"
                id="amenitiesSelect"
                label="Amenities"
            >
                <MenuItem>Air Conditioning</MenuItem>
                <MenuItem>Hot Tub</MenuItem>
            </Select>
            </FormControl>

            <FormControl sx={{width:155, mr:1}}>
            <InputLabel id="specialInterestsLabel">Special Interests</InputLabel>
            <Select
                labelId="specialInterestsLabel"
                id="specialInterestsSelect"
                label="Special Interests"
            >
                <MenuItem>Golf</MenuItem>
                <MenuItem>Skiing</MenuItem>
            </Select>
            </FormControl>

        </Grid>
        <Grid item xs={12} >
            <FormControlLabel control={<Checkbox />} label="Pets Allowed?" />
            <FormControlLabel control={<Checkbox />} label="On-Site Parking Available" />
        </Grid>
      </Grid>
      </FormGroup>
    </React.Fragment>
  );
}