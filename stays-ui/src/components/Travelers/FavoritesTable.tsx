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

import { StayClient } from "../../clients/stayClient";
import { StayRecord } from "../../models";

function dateString(timestamp: number): string {
  const date: Date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    editable: false,
    flex: 1,
    align: "left",
    minWidth: 100
  },
  {
    field: "location",
    headerName: "City",
    sortable: true,
    editable: false,
    flex: 1,
    align: "left",
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.location.address.city + ", " + params.row.location.state;
    }
  },
  {
    field: "region",
    headerName: "Region",
    sortable: true,
    editable: false,
    flex: 1
  },
  {
    field: "currentRate",
    headerName: "Rate",
    sortable: true,
    editable: false,
    flex: 1,
    align: "center"
  },
  {
    field: "capacity",
    headerName: "Capacity",
    sortable: true,
    editable: false,
    flex: 1,
    align: "center"
  },
  {
    field: "bedrooms",
    headerName: "Bedrooms",
    sortable: true,
    editable: false,
    flex: 1,
    align: "center"
  },
  {
    field: "petsAllowed",
    headerName: "Pets",
    sortable: true,
    editable: false,
    flex: 1,
    align: "center"
  },
  {
    field: "onSiteParking",
    headerName: "Parking",
    sortable: true,
    editable: false,
    flex: 1
  }
];

export type StayCallback = (stay: StayRecord) => any;

export interface FavoritesTableProps {
  onSelect: StayCallback;
}

export default function FavoritesTable(props: FavoritesTableProps) {
  const [stays, setStays] = React.useState<StayRecord[]>([]);
  const getStays = async () => {
    const stays = await new StayClient().getFavorites();
    setStays(stays);
  };

  React.useEffect(() => {
    getStays();
    return;
  }, []);

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
          />
        </div>
      </div>
    </React.Fragment>
  );
}
