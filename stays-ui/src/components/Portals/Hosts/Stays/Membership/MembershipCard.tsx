import { ArrowDownward, Loyalty } from "@mui/icons-material";
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
import NextLink from "next/link";
import { useRouter } from "next/router";

import { StayRecord } from "../../../../../models";
import { NextLinkComposed } from "../../../../Link";

export interface MembershipCardProps {
  stay: StayRecord;
}
export default function MembershipCard(props: MembershipCardProps) {
  const router = useRouter();
  return (
    <CardActionArea
      onClick={() => {
        router.push("/hosts/portal/membership");
      }}>
      <Card sx={{ height: "100%" }} {...props}>
        <CardContent>
          <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Typography color="textSecondary" gutterBottom variant="overline">
                MEMBERSHIP
              </Typography>
              <Typography color="textPrimary" variant="h6">
                Gold
              </Typography>
            </Grid>
            <Grid item>
              <Loyalty sx={{ color: "primary.main", height: 45, width: 45 }} />
            </Grid>
          </Grid>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              pt: 2
            }}>
            <Typography color="textSecondary" variant="caption">
              Upgrade to Platinum for x,y,z
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}
