import { Add, Edit, PlusOne, Star } from "@mui/icons-material";
import Delete from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import PrintIcon from "@mui/icons-material/Print";
import SaveIcon from "@mui/icons-material/Save";
import Search from "@mui/icons-material/Search";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  InputAdornment,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { format } from "path";
import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { StayRecord } from "../../../models";
import PropertyTypeTabs from "../../Directory/PropertyTypeTabs";
import HostPortal from "./HostPortal";

export interface MyStaysProps {
  stays: StayRecord[];
  orgName: string;
}

export default function MyStays(props: MyStaysProps) {
  const [selectedStayIds, setSelectedStayIds] = useState<string[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event: any) => {
    let newSelectedStayIds: string[];

    if (event.target.checked) {
      newSelectedStayIds = props.stays.map((stay) => stay.id);
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

  const actions: any = [];

  return (
    <HostPortal>
      <Box sx={{ maxWidth: "lg", margin: "auto", justifyContent: "center" }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            m: 1
          }}>
          <Typography sx={{ m: 1 }} variant="h4">
            {} Stays
          </Typography>
          <Box sx={{ m: 1 }}>
            <Button color="error" startIcon={<Delete fontSize="small" />} sx={{ mr: 1 }}>
              <Typography variant="button" sx={{ display: { xs: "none", sm: "block" } }}>
                Delete
              </Typography>
            </Button>
            <Button startIcon={<Edit fontSize="small" />} sx={{ mr: 1 }}>
              <Typography variant="button" sx={{ display: { xs: "none", sm: "block" } }}>
                Edit
              </Typography>
            </Button>
            <Button startIcon={<Add fontSize="large" />} color="primary" variant="contained">
              <Typography variant="button" sx={{ display: { xs: "none", sm: "block" } }}>
                New Listing
              </Typography>
            </Button>
          </Box>
        </Box>
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: { xs: 300, sm: 500, lg: 1050 } }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedStayIds.length === props.stays.length}
                        color="primary"
                        indeterminate={
                          selectedStayIds.length > 0 && selectedStayIds.length < props.stays.length
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
                    <TableRow
                      hover
                      key={stay.id}
                      selected={selectedStayIds.indexOf(stay.id) !== -1}>
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
            count={props.stays.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      </Box>
    </HostPortal>
  );
}
