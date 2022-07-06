import { Analytics, ArrowUpward } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

import { StayRecord } from "../../../../../models";

export interface VisibilityCardProps {
  stay: StayRecord;
}
export default function VisibilityCard(props: VisibilityCardProps) {
  const router = useRouter();
  return (
    <CardActionArea
      onClick={() => {
        router.push("/hosts/portal/demand");
      }}>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                DEMAND
              </Typography>
              <Typography color="textPrimary" variant="h6">
                High
              </Typography>
            </Grid>
            <Grid item>
              <Analytics sx={{ height: 45, width: 45, color: "primary.main" }} />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2
            }}>
            <ArrowUpward color="success" />
            <Typography
              variant="body2"
              sx={{
                mr: 1
              }}>
              16%
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Since last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
