import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import Collage from "../Collage";
import SectionHead from "../general/SectionHead";

const images = [
  {
    src: "https://media.vrbo.com/lodging/38000000/37860000/37859400/37859348/4916a261.f10.jpg",
    title: "Cabins/Cottage",
    width: "39%"
  },
  {
    src: "https://cdn.onekindesign.com/wp-content/uploads/2019/12/Rustic-Contemporary-A-Frame-Todd-Gordon-Mather-Architect-01-1-Kindesign.jpg",
    title: "A-Frames",
    width: "20%"
  },
  {
    src: "https://media.cntraveler.com/photos/60538d2f49557f7c85e41ddb/master/w_1920%2Cc_limit/Mohicans%2520The%2520View%2520treehouse%2520-%2520Credit%2520Allen%2520Heimberger-2.jpg",
    title: "Treehouse",
    width: "40%"
  },
  {
    src: "https://ychef.files.bbci.co.uk/1600x900/p0bdlxm5.webp",
    title: "Tiny House",
    width: "37%"
  },
  {
    src: "'https://www.glamping.com/static/media/uploads/property/Brush%20Creek%20Ranch/Brush%20Creek%20Ranch%20Yurt.jpg'",
    title: "Dome/Yurt",
    width: "38%"
  },
  {
    src: "https://imageio.forbes.com/specials-images/imageserve/5ef14b6d6867d4000608b6dc/Camp-Long-Creek-glamping-resort--Big-Cedar-Lodge/960x0.jpg?fit=bounds&format=jpg&width=960",
    title: "Glamping",
    width: "24%"
  },
  {
    src: "https://www.designinsiderlive.com/wp-content/uploads/2020/04/Hotel-Du-Vin-Avon-Gorge-features-artwork-by-Elegant-Clutter-web.jpg",
    title: "Boutique Hotels",
    width: "39%"
  },
  {
    src: "https://galeriemagazine.com/wp-content/uploads/2019/01/Dining_3-1024x674.jpg",
    title: "City Lights",
    width: "20%"
  },
  {
    src: "https://www.bluebeavercabins.com/wp-content/uploads/2020/04/open-concept-rooms-2.jpg",
    title: "For Groups",
    width: "40%"
  }
];

export default function Showcase() {
  return (
    <Box sx={{ display: "grid", gap: 10 }}>
      <SectionHead>Curated for the passionate traveler</SectionHead>
      <Collage images={images} />
    </Box>
  );
}
