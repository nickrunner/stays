import { makeStyles } from "@material-ui/core/styles";
import {
  BedroomChildOutlined,
  DownhillSkiing,
  GolfCourse,
  RoomService,
  SportsGolf
} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/FavoriteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ShareIcon from "@mui/icons-material/Share";
import { Box, Chip } from "@mui/material";
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
import { StringDecoder } from "string_decoder";

import styles from "../../../styles/StayDirectoryCard.module.css";
import { UserClient } from "../../clients/userClient";
import { content } from "../../content";
import { globalContext } from "../../GlobalStore";
import {
  Stay,
  StayAttribute,
  StayAttributeRecord,
  StayAttributeType,
  StayRecord,
  StaySearchFilter
} from "../../models";
import StayAttributeIcon from "../general/StayAttributeIcon";
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
  filter: StaySearchFilter;
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
      elevation={10}
      id={props.stay.id}
      sx={{ width: { xs: 300, sm: 300, md: 300, lg: 325, xl: 400 }, minHeight: 450 }}>
      <CardHeader
        avatar={
          <StayAttributeIcon type={StayAttributeType.Region} name={props.stay.location.region} />
        }
        action={favoriteIcon()}
        title={props.stay.location.address.city + ", " + props.stay.location.address.state}
        titleTypographyProps={{
          align: "left",
          variant: "subtitle1",
          color: "common.black"
        }}
        subheader={props.stay.name}
        subheaderTypographyProps={{
          variant: "subtitle2"
        }}
      />

      <CardMedia sx={{ zIndex: 1 }}>
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            p: 1,
            position: "absolute",
            zIndex: 1
          }}>
          <Chip
            sx={{ bgcolor: "action.focus", color: "common.white", fontWeight: 6600 }}
            size="small"
            label={props.stay.type[0]}></Chip>
        </Box>
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
        {props.stay.specialInterests.map((si: string) => {
          const color: string = props.filter.specialInterests
            ? props.filter.specialInterests.includes(si)
              ? "primary.main"
              : "primary.dark"
            : "primary.dark";
          return (
            <StayAttributeIcon
              sx={{ mx: 0.5, color: color }}
              key={si}
              type={StayAttributeType.SpecialInterest}
              name={si}
            />
          );
        })}
        {props.stay.amenities.map((am: string) => {
          const color: string = props.filter.amenities
            ? props.filter.amenities.includes(am)
              ? "primary.main"
              : "primary.dark"
            : "primary.dark";
          return (
            <StayAttributeIcon
              sx={{ mx: 0.5, color: color }}
              key={am}
              type={StayAttributeType.Amenity}
              name={am}
            />
          );
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
