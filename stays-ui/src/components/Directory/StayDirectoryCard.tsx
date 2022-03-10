import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Stay, StayRecord } from "../../../../common/models/Stay";
import { content } from "../../content";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export interface StayDirectoryCardProps {
  stay: StayRecord;
}

export default function StayDirectoryCard(props: StayDirectoryCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    return;
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getAvatar(region: string) {
    switch (region) {
      case "Coastal":
        return content.images.regions.coastal;
      case "Midwest":
        return content.images.regions.midwest;
      case "Northeast":
        return content.images.regions.northeast;
      case "Pacific Northwest":
        return content.images.regions.pnw;
      case "Southern":
        return content.images.regions.southern;
      case "Southwest":
        return content.images.regions.southwest;
      case "Western":
        return content.images.regions.western;
      default:
        return content.images.regions.american;
    }
  }

  // function getCaption(description: string) {
  //   return description.split(".")[0];
  // }

  function getImageCarouselProps(stay: Stay) {
    const imgs = [];
    for (const photo of stay.photos) {
      imgs.push({
        label: photo.url,
        imgPath: photo.url
      });
    }
    return imgs;
  }

  return (
    <Card id={props.stay.id} sx={{ width: { xs: 300, sm: 350, md: 375, lg: 400 }, minHeight: 500 }}>
      <CardHeader
        height="200"
        avatar={
          <Avatar
            sx={{ bgcolor: "primary.main" }}
            aria-label="stay"
            src={getAvatar(props.stay.location.region)}></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.stay.name}
        titleTypographyProps={{
          align: "left",
          variant: "subtitle1",
          color: "common.black"
        }}
        subheader={props.stay.location.address.city + ", " + props.stay.location.address.state}
        subheaderTypographyProps={{
          variant: "subtitle1"
        }}
      />
      <CardMedia>
        <ImageCarousel width="100%" height="300" images={getImageCarouselProps(props.stay)} />
      </CardMedia>
      {/* <CardContent>
     
        <Typography variant="body2" color="text.secondary">
          {getCaption(props.stay.description)}
        </Typography>
      </CardContent> */}
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
          aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.stay.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
