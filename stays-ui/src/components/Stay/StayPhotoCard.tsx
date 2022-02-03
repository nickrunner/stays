import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, TextField } from '@mui/material';
import { addStayContext } from './AddStayContext';

export default function StayPhotoCard(props:any) {
    const { stay } = React.useContext(addStayContext);
    const [ index, setIndex ] = React.useState(props.photo.priority);

    function handleDescriptionChange(description: string){
        for(let photo of stay.photos){
            if(photo.priority == index){
                photo.description = description;
            }
        }
    }

  return (
    <Card sx={{ m:3, border: '1px solid', borderColor: "primary.dark"}}>
        <CardMedia
          component="img"
          height="200"
          image={props.photo.url}
        />
        <CardContent sx={{height:100}}>
          <TextField
            sx={{mt:0, p:0}}
            label="Description of Photo"
            fullWidth
            multiline
            rows={1}
            defaultValue={props.photo.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />
        </CardContent>
    </Card>
  );
}