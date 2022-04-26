import { ArrowDownward, ArrowUpward, LocalOffer, Loyalty, People } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";

import { StayRecord } from "../../../../../models";

export interface VisibilityCardProps {
  stay: StayRecord;
}
export default function OffersCard(props: VisibilityCardProps) {
  const router = useRouter();
  return (
    <CardActionArea
      onClick={() => {
        router.push("/hosts/portal/offers");
      }}>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                Offers
              </Typography>
              <Typography color="textPrimary" variant="h6">
                2
              </Typography>
            </Grid>
            <Grid item>
              <LocalOffer
                sx={{
                  color: "primary.main",
                  height: 45,
                  width: 45
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2
            }}>
            <Typography color="textSecondary" variant="caption">
              Active Offers
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
