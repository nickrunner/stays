import * as React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, FormGroup, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { StayAttributeType } from '../../../../common/models/StayAttributes';
import { stayContext } from './StayContext';
import StayAttributeSelector from './StayAttributeSelector';



export default function StayInfoForm() {
  const { stay } = React.useContext(stayContext);
  const [pets, setPets] = React.useState(stay.petsAllowed);
  const [parking, setParking] = React.useState(stay.onSiteParking);

  function handleNameChange(newName: string){
      stay.name = newName;
  }

  function handleDescriptionChange(description: string){
      stay.description = description;
  }

  function handleRateChange(rate: string){

      stay.currentRate = Number(rate);
  }

  function handleCapacityChange(capacity: number){
      stay.capacity = capacity;
  }

  function handleBedroomChange(bedrooms: number){
      stay.bedrooms = bedrooms;
  }

  function handleOnSiteParkingChange(onSiteParking: boolean){
      setParking(onSiteParking);
      stay.onSiteParking = onSiteParking;
  }

  function handlePetsAllowedChange(petsAllowed: boolean){
      setPets(petsAllowed);
      stay.petsAllowed = petsAllowed;
  }

  return (
    <React.Fragment>
     
      <FormGroup>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        <FormControl sx={{mt:1, width:"65%" }}>
          <TextField
            required
            id="name"
            name="name"
            label="Stay Name"
            defaultValue={stay.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          </FormControl>
          <FormControl sx={{ ml: 1, mt:1, width:"25%" }}>
          <InputLabel htmlFor="outlined-adornment-amount">Current Rate</InputLabel>
          <OutlinedInput
            required
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            defaultValue={stay.currentRate}
            onChange={(event) => handleRateChange(event.target.value)}
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
            defaultValue={stay.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
            
            <FormControl >
            <InputLabel id="capacityLabel">Guest Capacity</InputLabel>
            <Select
                sx={{width:150, mr:1}}
                labelId="capacityLabel"
                id="capacity"
                name="capacity"
                label="Guest Capacity"
                defaultValue={stay.capacity}
                onChange={(e) => handleCapacityChange(e.target.value as number)}
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
                id="bedrooms"
                name="bedrooms"
                label="Bedrooms"
                defaultValue={stay.bedrooms}
                onChange={(e) => handleBedroomChange(e.target.value as number)}
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
            <StayAttributeSelector 
              type={StayAttributeType.PropertyType} 
              label="Property Type"
              />
            </FormControl>
        </Grid>
            
        <Grid item xs={12}>
            <FormControl sx={{width:150, mr:1}}>
            <InputLabel id="amenitiesLabel">Amenities</InputLabel>
            <StayAttributeSelector 
              type={StayAttributeType.Amenity} 
              label="Amenities"
              />
            </FormControl>
        </Grid>
        <Grid item xs={12}>
            <FormControl sx={{width:155, mr:1}}>
            <InputLabel id="specialInterestsLabel">Special Interests</InputLabel>
            <StayAttributeSelector 
              type={StayAttributeType.SpecialInterest} 
              label="Special Interests"
              />
            </FormControl>

        </Grid>
        <Grid item xs={12} >
            
            <FormControlLabel 
            checked={pets} 
            control={<Checkbox />} 
            label="Pets Allowed?" 
            onChange={(e, checked)=>handlePetsAllowedChange(checked)}/>
            
            <FormControlLabel 
            checked={parking}
            control={<Checkbox />} 
            label="On-Site Parking Available"
            onChange={(e, checked)=>handleOnSiteParkingChange(checked)} />
        </Grid>
      </Grid>
      </FormGroup>
    </React.Fragment>
  );
}