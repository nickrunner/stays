import { Box, Typography } from "@mui/material";
import React from "react";

import { StayClient } from "../../clients/stayClient";
import { Photo, StayRecord } from "../../models";
import { Nav } from "../AppBar/AppBar";
import Collage from "../Collage";
import Section from "../general/Section";
import SectionHead from "../general/SectionHead";
import SectionSub from "../general/SectionSub";

export interface ListingProps {
  stayId: string;
}

export default function Listing(props: ListingProps) {
  const [stay, setStay] = React.useState<StayRecord | undefined>(undefined);

  async function getStay() {
    const s: StayRecord = await new StayClient().getStay(props.stayId);
    setStay(s);
  }

  React.useEffect(() => {
    getStay();
    return;
  }, []);

  function getPhotos() {
    const photos = [];
    if (!stay) {
      return [];
    }
    for (let i = 0; i < 5; i++) {
      const photo = stay.photos[i];
      if (photo.priority === 0) {
        continue;
      }
      photos.push({
        src: photo.url,
        title: "",
        onClick: console.log("On Click")
      });
    }
    return photos;
  }

  function getFeature(): Photo {
    if (!stay) {
      return { url: "", description: "", priority: 0 };
    }
    for (const photo of stay.photos) {
      if (photo.priority === 0) {
        return photo;
      }
    }
    return stay.photos[0];
  }

  return (
    <React.Fragment>
      <Nav transparent={false} />
      <Section>
        <Box sx={{ mt: 10 }}>
          <Typography variant="h3">{stay ? stay.name : ""}</Typography>

          <Box sx={{ mt: 5, width: 800, height: 500, display: "flex" }}>
            {/* <Box sx={{ width: 300, height: 300 }}>
              <img alt={getFeature().description} src={getFeature().url} />
            </Box> */}
            <Box sx={{ width: 800, height: 500 }}>
              <Collage
                feature={{ src: getFeature().url, title: "", width: 380 }}
                height={250}
                cols={2}
                images={getPhotos()}></Collage>
            </Box>
          </Box>

          <Typography sx={{ mt: 5, mb: 5 }} variant="subtitle1">
            {stay ? stay.type[0] : ""} in{" "}
            {stay ? stay.location.address.city + ", " + stay.location.address.state : ""}
          </Typography>
          <Box sx={{ maxWidth: 800 }}>
            <Typography variant="body1">{stay ? stay.description : ""}</Typography>
          </Box>
        </Box>
      </Section>
    </React.Fragment>
  );
}
