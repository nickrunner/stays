import { ArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { StayClient } from "../../../../../clients/stayClient";
import { StayPromotionRecord, StayPromotionStatus, StayRecord } from "../../../../../models";
import AddButton from "../../../../general/AddButton";
import { StatusPill } from "../../../StatusPill";

export interface PromotionsCardProps {
  stay: StayRecord;
}

export function PromotionsTable(props: PromotionsCardProps) {
  const [promotions, setPromotions] = React.useState<StayPromotionRecord[]>([]);
  const router = useRouter();

  async function getPromotions() {
    if (props.stay) {
      const p: StayPromotionRecord[] = await new StayClient().getPromotionsOfStay(
        props.stay.id ?? ""
      );
      setPromotions(p);
    }
  }

  React.useEffect(() => {
    getPromotions();
    return;
  }, [props.stay]);

  return (
    <CardActionArea
      onClick={() => {
        router.push("/hosts/portal/promotions");
      }}>
      <Card {...props}>
        <CardHeader
          title="Promotions"
          action={
            <AddButton
              onClick={() => {
                router.push("/hosts/portal/dashboard/promotions/add");
              }}></AddButton>
          }
        />
        <PerfectScrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Platform</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip enterDelay={300} title="Sort">
                      <TableSortLabel active direction="desc">
                        Execution Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {promotions.map((promotion: StayPromotionRecord) => (
                  <TableRow hover key={promotion.id}>
                    <TableCell>{promotion.socialPlatform}</TableCell>
                    <TableCell>{promotion.type}</TableCell>
                    <TableCell>{new Date(promotion.startDate).toDateString()}</TableCell>
                    <TableCell>
                      <StatusPill
                        color={
                          (promotion.status === StayPromotionStatus.Executed && "success") ||
                          (promotion.status === StayPromotionStatus.Requested && "warning") ||
                          "info"
                        }>
                        {promotion.status}
                      </StatusPill>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}>
          <Button
            color="primary"
            endIcon={<ArrowRight fontSize="small" />}
            size="small"
            variant="text">
            View all
          </Button>
        </Box>
      </Card>
    </CardActionArea>
  );
}
