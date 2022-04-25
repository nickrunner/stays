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
}
export default function StayTable(props: StayTableProps) {
  const [selectedStayIds, setSelectedStayIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event: any) => {
    let newSelectedStayIds: string[];

    if (event.target.checked) {
      newSelectedStayIds = props.stays.map((stay: StayRecord) => stay.id);
    } else {
      newSelectedStayIds = [];
    }

    setSelectedStayIds(newSelectedStayIds);
  };

  const handleSelectOne = (event: any, id: string) => {
    const selectedIndex = selectedStayIds.indexOf(id);
    let newSelectedStayIds: string[] = [];

    if (selectedIndex === -1) {
      newSelectedStayIds = newSelectedStayIds.concat(selectedStayIds, id);
    } else if (selectedIndex === 0) {
      newSelectedStayIds = newSelectedStayIds.concat(selectedStayIds.slice(1));
    } else if (selectedIndex === selectedStayIds.length - 1) {
      newSelectedStayIds = newSelectedStayIds.concat(selectedStayIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedStayIds = newSelectedStayIds.concat(
        selectedStayIds.slice(0, selectedIndex),
        selectedStayIds.slice(selectedIndex + 1)
      );
    }

    setSelectedStayIds(newSelectedStayIds);
  };

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
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedStayIds.length === stays.length}
                    color="primary"
                    indeterminate={
                      selectedStayIds.length > 0 && selectedStayIds.length < stays.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Plan</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.stays.slice(0, limit).map((stay: StayRecord) => (
                <TableRow hover key={stay.id} selected={selectedStayIds.indexOf(stay.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedStayIds.indexOf(stay.id) !== -1}
                      onChange={(event) => handleSelectOne(event, stay.id)}
                      value="true"
                    />
                  </TableCell>
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
