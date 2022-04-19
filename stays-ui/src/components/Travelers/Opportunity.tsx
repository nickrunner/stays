import { Box, Button, Paper, Typography } from "@mui/material";
import { LoremIpsum } from "lorem-ipsum";
import React from "react";

import Info from "../general/Info";

export default function Opportunity(props: any) {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  return (
    <React.Fragment>
      <Paper
        sx={{
          maxWidth: "lg",
          display: "grid",
          border: 1,
          borderColor: "primary.dark",
          borderRadius: 2,
          p: 2
        }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ p: 2, display: "grid" }}>
            <Typography variant="h5">50% Off 3 Night Stay</Typography>
            <Typography variant="subtitle1">May - June</Typography>
          </Box>
          <Button sx={{ m: "auto", width: 200, height: 50 }} variant="contained">
            Book Now
          </Button>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ dispaly: "flex", borderRadius: 2, p: 2 }}>
            <img
              width={300}
              height={300}
              src={props.stay.photos[0].url}
              alt={props.stay.photos[0].description}
            />
          </Box>
          <Box sx={{ maxWidth: 300, px: 2 }}>
            <Info title={props.stay.name} body={lorem.generateSentences(5)} />
          </Box>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
