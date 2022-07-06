import { Delete } from "@material-ui/icons";
import { ArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography
} from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import React from "react";

import { CancellationClient } from "../../../../../clients/cancellationClient";
import { StayClient } from "../../../../../clients/stayClient";
import { CancellationRecord, StayRecord } from "../../../../../models";
import AddButton from "../../../../general/AddButton";
import CancellationCalendar from "./CancellationCalendar";

export interface CancellationCardProps {
  stay: StayRecord | undefined;
}

export default function CancellationCard(props: CancellationCardProps) {
  const [cancellations, setCancellations] = React.useState<CancellationRecord[]>([]);
  const [calendarOpen, setCalendarOpen] = React.useState(false);

  async function getCancellations() {
    if (props.stay) {
      const c = await new StayClient().getCancellationsOfStay(props.stay.id ?? "");
      setCancellations(c);
    }
  }

  function closeCalendar() {
    setCalendarOpen(false);
    getCancellations();
  }

  async function handleDeleteCancellationClick(cancellation: CancellationRecord) {
    await new CancellationClient().deleteCancellation(cancellation.id);
    await getCancellations();
  }

  React.useEffect(() => {
    getCancellations();
    return;
  }, [props.stay]);

  return (
    <React.Fragment>
      <Modal
        open={calendarOpen}
        aria-labelledby="open cancellation calendar"
        aria-describedby="calendar for creating cancellations"
        onClose={() => {
          closeCalendar();
        }}>
        <React.Suspense fallback={<p>Waiting...</p>}>
          <CancellationCalendar close={closeCalendar} stay={props.stay} />
        </React.Suspense>
      </Modal>

      <Card {...props}>
        <CardHeader
          subtitle={`${cancellations.length} in total`}
          title="Cancellations"
          action={
            <AddButton
              onClick={() => {
                setCalendarOpen(true);
              }}></AddButton>
          }
        />
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
                  format(cancellation.startDate, "MMMM, do") +
                  " - " +
                  format(cancellation.endDate, "MMMM, do")
                }
                secondary={formatDistanceToNow(cancellation.startDate) + " remaining"}
              />
              <IconButton
                edge="end"
                size="small"
                color="error"
                onClick={(event: any) => {
                  event.stopPropagation();
                  handleDeleteCancellationClick(cancellation);
                }}>
                <Delete />
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
    </React.Fragment>
  );
}
