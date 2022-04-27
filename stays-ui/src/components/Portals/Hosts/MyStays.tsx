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
  Grid,
  InputAdornment,
  Pagination,
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
import { useRouter } from "next/router";
import { format } from "path";
import React from "react";
import { useState } from "react";

import { StayRecord } from "../../../models";
import PropertyTypeTabs from "../../Directory/PropertyTypeTabs";
import StayTable from "../StayTable";
import HostPortal from "./HostPortal";
import HostStayCard from "./HostStayCard";
import HostStayCards from "./HostStayCards";

export default function MyStays(props: any) {
  const [selectedStayIds, setSelectedStayIds] = useState<string[]>([]);
  const [stays, setStays] = React.useState<StayRecord[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const router = useRouter();

  const handleSelectAll = (event: any) => {
    let newSelectedStayIds: string[];

    if (event.target.checked) {
      newSelectedStayIds = stays.map((stay: StayRecord) => stay.id);
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

  function handleStaysReceived(newStays: StayRecord[]) {
    setStays(newStays);
  }

  return (
    <HostPortal
      onStaysReceived={(newStays: StayRecord[]) => {
        handleStaysReceived(newStays);
      }}>
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
            <Button
              startIcon={<Add fontSize="large" />}
              color="primary"
              variant="contained"
              onClick={() => {
                router.push("/hosts/portal/stays/add");
              }}>
              <Typography variant="button" sx={{ display: { xs: "none", sm: "block" } }}>
                New Listing
              </Typography>
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: stays.length <= 600 ? "block" : "none" }}>
          <HostStayCards stays={stays} />
        </Box>
        <Box sx={{ display: stays.length <= 6 ? "none" : "block" }}>
          <StayTable stays={stays} />
        </Box>
      </Box>
    </HostPortal>
  );
}