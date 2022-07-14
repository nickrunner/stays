import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import stays from "../../../pages/cms/stays";
import { StayRecord } from "../../models";

export interface StayTableProps {
  stays: StayRecord[];
  onStaySelected: (stay: StayRecord) => void;
}
export default function StayTable(props: StayTableProps) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: { xs: 300, sm: 500, lg: 1050 } }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Plan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.stays.slice(0, limit).map((stay: StayRecord) => (
                <TableRow
                  sx={{ cursor: "pointer" }}
                  hover
                  key={stay.id}
                  onClick={() => props.onStaySelected(stay)}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex"
                      }}>
                      <Avatar src={stay.photos[0].url} sx={{ mr: 2 }}>
                        {stay.name}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {stay.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {`${stay.location.address.city}, ${stay.location.address.state}`}
                  </TableCell>
                  <TableCell>Free</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={stays.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
