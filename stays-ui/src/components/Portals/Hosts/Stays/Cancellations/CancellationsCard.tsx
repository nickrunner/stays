import { ArrowRight, MoreVert } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { CancellationClient } from "../../../../../clients/cancellationClient";
import { StayClient } from "../../../../../clients/stayClient";
import { CancellationRecord, StayRecord } from "../../../../../models";

export interface CancellationCardProps {
  stay: StayRecord;
}

export default function CancellationCard(props: CancellationCardProps) {
  const [cancellations, setCancellations] = React.useState<CancellationRecord[]>([]);
  const router = useRouter();

  async function getCancellations() {
    if (props.stay) {
      const c = await new StayClient().getCancellationsOfStay(props.stay.id ?? "");
      setCancellations(c);
    }
  }

  React.useEffect(() => {
    getCancellations();
    return;
  }, [props.stay]);

  return (
    <CardActionArea
      onClick={() => {
        router.push("/hosts/portal/cancellations");
      }}>
      <Card {...props}>
        <CardHeader subtitle={`${cancellations.length} in total`} title="Cancellations" />
        <Divider />
        <Typography
          sx={{ m: 3, display: cancellations.length > 0 ? "none" : "block" }}
          variant="caption">
          No cancellations
        </Typography>
        <List>
          {cancellations.map((cancellation, i) => (
            <ListItem divider={i < cancellations.length - 1} key={cancellation.id}>
              <ListItemText
                primary={
                  new Date(cancellation.startDate).toString() +
                  "-" +
                  new Date(cancellation.endDate).toString()
                }
                secondary={"12 days remaining"}
              />
              <IconButton edge="end" size="small">
                <MoreVert />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}>
          <Button color="primary" endIcon={<ArrowRight />} size="small" variant="text">
            View all
          </Button>
        </Box>
      </Card>
    </CardActionArea>
  );
}
