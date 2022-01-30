import { Grid3x3 } from "@mui/icons-material";
import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Stay } from "../../models/Stay";
import { addStayContext } from "./AddStayContext";
import StayPhotoCard from "./StayPhotoCard";


export default function StayReview(props:any) {
    const { stay } = React.useContext(addStayContext);
    
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
        <Box margin="auto" sx={{justifyContent:"center"}}>
                {stay.photos.map((photo) => {
                    return <StayPhotoCard key={photo.url} photo={photo} />
                })}
        </Box>
        
        </Grid>

        </React.Fragment>
    )
}