import AcUnitIcon from "@mui/icons-material/AcUnit";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ArchitectureIcon from "@mui/icons-material/Architecture";
import BalconyIcon from "@mui/icons-material/Balcony";
import BungalowIcon from "@mui/icons-material/Bungalow";
import CabinIcon from "@mui/icons-material/Cabin";
import CellWifiIcon from "@mui/icons-material/CellWifi";
import ChaletIcon from "@mui/icons-material/Chalet";
import DeckIcon from "@mui/icons-material/Deck";
import DiamondIcon from "@mui/icons-material/Diamond";
import DownhillSkiingIcon from "@mui/icons-material/DownhillSkiing";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import GolfCourseIcon from "@mui/icons-material/GolfCourse";
import HikingIcon from "@mui/icons-material/Hiking";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import HotTubIcon from "@mui/icons-material/HotTub";
import LandscapeIcon from "@mui/icons-material/Landscape";
import PoolIcon from "@mui/icons-material/Pool";
import PowerOffIcon from "@mui/icons-material/PowerOff";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import WaterIcon from "@mui/icons-material/Water";
import WineBarIcon from "@mui/icons-material/WineBar";
import { Avatar, Tooltip } from "@mui/material";
import { GiBarracksTent, GiHabitatDome, GiTreehouse } from "react-icons/gi";

import { content } from "../../content";
import { StayAttributeType } from "../../models";

export interface StayAttributeIconProps {
  type: StayAttributeType;
  name: string;
  sx?: any;
}

function getIcon(props: StayAttributeIconProps) {
  switch (props.type) {
    case StayAttributeType.PropertyType:
      switch (props.name) {
        case "A-Frame":
          return <BungalowIcon sx={props.sx} />;
        case "Boutique Hotel":
          return <ApartmentIcon sx={props.sx} />;
        case "Cabin/Cottage":
          return <CabinIcon sx={props.sx} />;
        case "Dome/Yurt":
          return <GiHabitatDome style={props.sx} />;
        case "Glamping":
          return <GiBarracksTent />;
        case "Tiny House":
          return <ChaletIcon sx={props.sx} />;
        case "Treehouse":
          return <GiTreehouse />;
        case "Unique Build":
          return <ArchitectureIcon sx={props.sx} />;
        default:
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.american}></Avatar>
          );
      }
    case StayAttributeType.SpecialInterest:
      switch (props.name) {
        case "Golf":
          return <GolfCourseIcon sx={props.sx} />;
        case "Hiking":
          return <HikingIcon sx={props.sx} />;
        case "Historic":
          return <HistoryEduIcon sx={props.sx} />;
        case "Interior Design":
          return <BalconyIcon sx={props.sx} />;
        case "Luxury ":
          return <DiamondIcon sx={props.sx} />;
        case "Off-grid":
          return <PowerOffIcon sx={props.sx} />;
        case "Relax":
          return <SelfImprovementIcon sx={props.sx} />;
        case "Ski":
          return <DownhillSkiingIcon sx={props.sx} />;
        case "Views":
          return <LandscapeIcon sx={props.sx} />;
        case "Waterfront":
          return <WaterIcon sx={props.sx} />;
        case "Wine":
          return <WineBarIcon sx={props.sx} />;
        default:
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.american}></Avatar>
          );
      }
      break;
    case StayAttributeType.Amenity:
      switch (props.name) {
        case "Air Conditioning":
          return <AcUnitIcon sx={props.sx} />;
        case "Gym":
          return <FitnessCenterIcon sx={props.sx} />;
        case "Heating":
          return <FireplaceIcon sx={props.sx} />;
        case "Hot Tub":
          return <HotTubIcon sx={props.sx} />;
        case "Patio/Deck":
          return <DeckIcon sx={props.sx} />;
        case "Pool":
          return <PoolIcon sx={props.sx} />;
        case "WiFi":
          return <CellWifiIcon sx={props.sx} />;
        default:
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.american}></Avatar>
          );
      }
      break;
    case StayAttributeType.Region:
      switch (props.name) {
        case "Coastal":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.coastal}></Avatar>
          );
        case "Midwest":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.midwest}></Avatar>
          );
        case "Northeast":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.northeast}></Avatar>
          );
        case "Pacific Northwest":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.pnw}></Avatar>
          );
        case "Southern":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.southern}></Avatar>
          );
        case "Southwest":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.southwest}></Avatar>
          );
        case "Western":
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.western}></Avatar>
          );
        default:
          return (
            <Avatar
              sx={{ bgcolor: "primary.main" }}
              aria-label="stay"
              src={content.images.regions.american}></Avatar>
          );
      }
      break;
    default:
      return (
        <Avatar
          sx={{ bgcolor: "primary.main" }}
          aria-label="stay"
          src={content.images.regions.american}></Avatar>
      );
  }
}

export default function StayAttributeIcon(props: StayAttributeIconProps) {
  return <Tooltip title={props.name}>{getIcon(props)}</Tooltip>;
}
