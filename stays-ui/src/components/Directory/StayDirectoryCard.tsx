import { makeStyles } from "@material-ui/core/styles";
import { BedroomChildOutlined, DownhillSkiing, GolfCourse, RoomService } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/FavoriteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";

import styles from "../../../styles/StayDirectoryCard.module.css";
import { UserClient } from "../../clients/userClient";
import { content } from "../../content";
import { globalContext } from "../../GlobalStore";
import { Stay, StayAttributeRecord, StayRecord } from "../../models";
import ImageCarousel from "../ImageCarousel/ImageCarousel";

interface ExpandMoreProps extends IconButtonProps {
  expand: number;
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
  onSignInRequired: () => void;
}

const useStyles = makeStyles((theme) => ({
  favoriteButton: {
    "&:hover": {
      color: "#6c5ee6"
    }
  }
}));

export default function StayDirectoryCard(props: StayDirectoryCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const { globalState, dispatch } = React.useContext(globalContext);
  const [favoriteLoading, setFavoriteLoading] = React.useState(false);

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

  async function handleAddFavoriteButtonClick() {
    if (!globalState.isSignedIn) {
      props.onSignInRequired();
      return;
    }
    setFavoriteLoading(true);
    const client = new UserClient();
    await client.addFavorite(props.stay.id);
    await client.getSelf().then((value) => {
      dispatch({ type: "GET_SELF", payload: value });
    });
    setFavoriteLoading(false);
  }

  async function handleRemoveFavoriteButtonClick() {
    if (!globalState.isSignedIn) {
      props.onSignInRequired();
      return;
    }
    setFavoriteLoading(true);
    const client = new UserClient();
    await client.removeFavorite(props.stay.id);
    await client.getSelf().then((value) => {
      dispatch({ type: "GET_SELF", payload: value });
    });
    setFavoriteLoading(false);
  }

  function isFavorited(): boolean {
    if (!globalState.isSignedIn) {
      return false;
    }
    if (!globalState.self) {
      return false;
    }
    if (!globalState.self.favorites) {
      return false;
    }
    return globalState.self.favorites.includes(props.stay.id);
  }

  function favoriteIcon(): JSX.Element {
    if (favoriteLoading) {
      return <CircularProgress sx={{ p: 1 }} />;
    } else if (isFavorited()) {
      return (
        <IconButton
          sx={{ color: "primary.main", display: isFavorited() ? "block" : "none" }}
          aria-label="remove from favorites"
          onClick={() => {
            handleRemoveFavoriteButtonClick();
          }}>
          <FavoriteIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          sx={{ display: isFavorited() ? "none" : "block" }}
          aria-label="add to favorites"
          className={classes.favoriteButton}
          onClick={() => {
            handleAddFavoriteButtonClick();
          }}>
          <FavoriteBorderIcon />
        </IconButton>
      );
    }
  }

  const classes = useStyles();
  return (
    <Card
      id={props.stay.id}
      sx={{ width: { xs: 300, sm: 300, md: 300, lg: 325, xl: 400 }, minHeight: 450 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: "primary.main" }}
            aria-label="stay"
            src={getAvatar(props.stay.location.region)}></Avatar>
        }
        action={favoriteIcon()}
        title={props.stay.name}
        titleTypographyProps={{
          align: "left",
          variant: "subtitle1",
          color: "common.black"
        }}
        subheader={props.stay.location.address.city + ", " + props.stay.location.address.state}
        subheaderTypographyProps={{
          variant: "caption"
        }}
      />

      <CardMedia sx={{ zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            p: 1,
            position: "absolute",
            zIndex: 1,
            mt: 26
          }}>
          <Typography variant="body2" sx={{ color: "common.white", mt: 1 }}>
            Sleeps
          </Typography>
          <Typography variant="h6" sx={{ color: "common.white" }}>
            {props.stay.capacity}
          </Typography>
          <Typography variant="body2" sx={{ color: "common.white", mt: 1 }}>
            for
          </Typography>
          <Typography variant="h6" sx={{ color: "common.white" }}>
            ${props.stay.currentRate}
          </Typography>
          <Typography variant="body2" sx={{ color: "common.white", mt: 1 }}>
            /
          </Typography>
          <Typography variant="body2" sx={{ color: "common.white", mt: 1 }}>
            night
          </Typography>
        </Box>
        <ImageCarousel width="100%" height="250" images={getImageCarouselProps(props.stay)} />
      </CardMedia>
      {/* <CardContent>
     
        <Typography variant="body2" color="text.secondary">
          {getCaption(props.stay.description)}
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        {props.stay.specialInterests.map((exp) => {
          return <DownhillSkiing key={exp} />;
        })}
        {props.stay.amenities.map((am) => {
          return <RoomService key={am} />;
        })}
        <ExpandMore
          expand={expanded ? 1 : 0}
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
