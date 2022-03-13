import { Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import * as React from "react";

import { PromotionRecord } from "../../models";

function dateString(timestamp: number): string {
  const date: Date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: true,
    width: 200
  },
  {
    field: "code",
    headerName: "code",
    sortable: true,
    width: 200
  },
  {
    field: "createdAt",
    headerName: "Created On",
    sortable: true,
    width: 100,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.createdAt)
  },
  {
    field: "updatedAt",
    headerName: "Updated On",
    sortable: true,
    width: 100,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.updatedAt)
  }
];

export type PromotionCallback = (promotion: PromotionRecord) => any;

export interface PromotionsTableProps {
  promotions: PromotionRecord[];
  onSelect: PromotionCallback;
}

export default function PromotionsTable(props: PromotionsTableProps) {
  return (
    <React.Fragment>
      <Typography>Promotions</Typography>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params: GridCellParams) => {
            props.onSelect(params.row as PromotionRecord);
          }}
          rows={props.promotions}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  );
}
