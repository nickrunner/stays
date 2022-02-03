import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { StayContext, stayContext } from './StayContext';

export default function StayInfoForm(props:any) {
    const { stay } = React.useContext(stayContext);

  return (
    <StayContext>
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="shipping address-line1"
            defaultValue = {stay.location.address.address1}
            onChange={(e) => {stay.location.address.address1 = e.target.value}}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
            defaultValue = {stay.location.address.address2}
            onChange={(e) => {stay.location.address.address2 = e.target.value}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="shipping address-level2"
            defaultValue = {stay.location.address.city}
            onChange={(e) => {stay.location.address.city = e.target.value}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            defaultValue = {stay.location.address.state}
            onChange={(e) => {stay.location.address.state = e.target.value}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            defaultValue = {stay.location.address.zip}
            onChange={(e) => {stay.location.address.zip = Number(e.target.value)}}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="shipping country"
            defaultValue = {stay.location.address.country}
            onChange={(e) => {stay.location.address.country = e.target.value}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
    </StayContext>
  );
}