import { Typography } from "@mui/material";
import {
  DataGridPro,
  GridCellEditCommitParams,
  GridCellParams,
  GridColDef,
  GridToolbar,
  GridValueGetterParams
} from "@mui/x-data-grid-pro";
import * as React from "react";

import { StayRecord } from "../../../../common/models/Stay";
import { StayClient } from "../../clients/stayClient";

function dateString(timestamp: number): string {
  const date: Date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

const columns: GridColDef[] = [
  {
    field: "enable",
    headerName: "Enabled",
    sortable: true,
    editable: true,
    flex: 1,
    align: "center"
  },
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    editable: true,
    flex: 1,
    align: "left",
    minWidth: 100
  },
  {
    field: "hostEmail",
    headerName: "Host",
    sortable: true,
    editable: true,
    flex: 1,
    align: "left"
  },
  {
    field: "location",
    headerName: "City",
    sortable: true,
    editable: true,
    flex: 1,
    align: "left",
    valueGetter: (params: GridValueGetterParams) => params.row.location.address.city
  },
  {
    field: "state",
    headerName: "State",
    sortable: true,
    editable: true,
    align: "left",
    valueGetter: (params: GridValueGetterParams) => params.row.location.address.state,
    flex: 1
  },
  {
    field: "region",
    headerName: "Region",
    sortable: true,
    editable: true,
    flex: 1
  },
  {
    field: "currentRate",
    headerName: "Rate",
    sortable: true,
    editable: true,
    flex: 1,
    align: "center"
  },
  {
    field: "capacity",
    headerName: "Capacity",
    sortable: true,
    editable: true,
    flex: 1,
    align: "center"
  },
  {
    field: "bedrooms",
    headerName: "Bedrooms",
    sortable: true,
    editable: true,
    flex: 1,
    align: "center"
  },
  {
    field: "petsAllowed",
    headerName: "Pets",
    sortable: true,
    editable: true,
    flex: 1,
    align: "center"
  },
  {
    field: "onSiteParking",
    headerName: "Parking",
    sortable: true,
    editable: true,
    flex: 1
  },
  {
    field: "specialInterests",
    headerName: "Special Interests",
    sortable: true,
    editable: true,
    flex: 1
  },

  {
    field: "amenities",
    headerName: "Amenities",
    sortable: true,
    editable: true,
    flex: 1
  },

  {
    field: "createdAt",
    headerName: "Created On",
    sortable: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.createdAt)
  },
  {
    field: "updatedAt",
    headerName: "Updated On",
    sortable: true,
    flex: 1,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.updatedAt)
  }
];

export type StayCallback = (stay: StayRecord) => any;

export interface StaysTableProps {
  onSelect: StayCallback;
}

export default function StaysTable(props: StaysTableProps) {
  const [stays, setStays] = React.useState<StayRecord[]>([]);
  const getStays = async () => {
    const stays = await new StayClient().getStays();
    setStays(stays);
  };

  React.useEffect(() => {
    getStays();
    return;
  }, []);

  async function handleCellEditCommit(params: GridCellEditCommitParams) {
    const val: any = params.value?.valueOf();
    if (val) {
      const stay: StayRecord = await new StayClient().patchStay(
        params.id.toString(),
        params.field,
        val
      );
      setStays((prev) => prev.map((row) => (row.id === params.id ? { ...row, ...stay } : row)));
    }
  }

  return (
    <React.Fragment>
      <Typography>Stays</Typography>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGridPro
            onCellClick={(params: GridCellParams) => {
              props.onSelect(params.row as StayRecord);
            }}
            rows={stays}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25]}
            components={{
              Toolbar: GridToolbar
            }}
            onCellEditCommit={handleCellEditCommit}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
