import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { StayRecord } from '../../models/Stay';
import { globalContext } from '../../GlobalStore';
import { Photo } from '../../models/Photo';
import { content } from "../../content";


interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }
  
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export interface StayDirectoryCardProps {
    stay: StayRecord
}


export default function StayDirectoryCard(props: StayDirectoryCardProps){
  const [width, setWidth] = React.useState(1200);
  const [expanded, setExpanded] = React.useState(false);
  const {globalState, dispatch} = React.useContext(globalContext);

  function getWidth(){
    const w = globalState.mobile ? window.innerWidth/1.2 : window.innerWidth / 3.5;
    setWidth(w);
  }

  React.useEffect(() => {
        getWidth();
        window.addEventListener('resize', getWidth)
        return;
    }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getFeatureImage(photos: Photo[]): string{
      let featureUrl = photos[0].url;
      let priority = photos[0].priority;
      photos.forEach((p) => {
          if(p.priority < priority) {
              priority = p.priority;
              featureUrl = p.url;
          }
      });
      return featureUrl;
  }

  return (
    <Card sx={{ width: {width} }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }} aria-label="stay" src={content.images.logo.purple}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.stay.name}
        subheader={props.stay.location.address.city+", "+props.stay.location.address.state}
      />
      <CardMedia
        component="img"
        height="300"
        image={getFeatureImage(props.stay.photos)}
        alt="Feature Photo"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Teaser text
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {props.stay.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}