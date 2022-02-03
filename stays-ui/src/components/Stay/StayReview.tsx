import { Grid3x3 } from "@mui/icons-material";
import { Box, Grid, ImageListItemBar, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Stay } from "../../models/Stay";
import { stayContext } from "./StayContext";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function StayReview(props:any) {
    const { stay } = React.useContext(stayContext);

 
    return (
        <React.Fragment>
        <Typography variant="h6" gutterBottom>
            {stay.name}
        </Typography>
        <Typography variant="subtitle1">{stay.type}</Typography>
        <Grid>
        <List disablePadding>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Description" secondary={stay.description} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Rate" secondary={stay.currentRate} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Capacity" secondary={stay.capacity} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Bedrooms" secondary={stay.bedrooms} />
            </ListItem>
        </List>
        <List>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Pets?" secondary={stay.petsAllowed ? "Yes" : "No"} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="On-Site Parking?" secondary={stay.onSiteParking? "Yes" : "No"} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Amenities" secondary={stay.amenities} />
            </ListItem>
            <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Special Interests" secondary={stay.perks} />
            </ListItem>
        </List>
        <Typography variant="h6" gutterBottom>
            Photos
        </Typography>
        <ImageList sx={{ width: 500, height: 450 }} cols={2} rowHeight={164}>
            {stay.photos.map((photo) => (
                <ImageListItem key={photo.url}>
                <img
                    src= {photo.url+"?w=164&h=164&fit=crop&auto=format&dpr=2 2x"}
                    srcSet={photo.url}
                    alt={photo.description}
                    loading="lazy"
                />
                 <ImageListItemBar title={photo.description} subtitle={"Priority: "+photo.priority} />
                </ImageListItem>
            ))}
        </ImageList>
        </Grid>

        </React.Fragment>
    )
}