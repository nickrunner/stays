import * as React from 'react';
import { StayRecord } from '../../../models/Stay';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';

function dateString(timestamp: number): string {
  const date: Date = new Date(timestamp);
  return date.toLocaleDateString()+" "+date.toLocaleTimeString();
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    sortable: true,
    width: 200,
  },
  {
    field: 'hostId',
    headerName: 'Host',
    sortable: true,
    width: 100,
  },
  {
    field: 'location',
    headerName: 'City',
    sortable: true,
    width: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.location.address.city
  },
  {
    field: 'state',
    headerName: 'State',
    sortable: true,
    width: 100,
  },
  {
    field: 'region',
    headerName: 'Region',
    sortable: true,
    width: 100,
  },
  {
    field: 'rate',
    headerName: 'Rate',
    sortable: true,
    width: 100,
    valueGetter: (params: GridValueGetterParams) => params.row.min+"-"+params.row.max

  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    sortable: true,
    editable: true,
    width: 100,
  },
  {
    field: 'bedrooms',
    headerName: 'Bedrooms',
    sortable: true,
    width: 100,
  },
  {
    field: 'petsAllowed',
    headerName: 'Pets',
    sortable: true,
    width: 100,
  },
  {
    field: 'onSiteParking',
    headerName: 'Parking',
    sortable: true,
    width: 100,
  },
  {
    field: 'perks',
    headerName: 'Perks',
    sortable: true,
    width: 100,
  },

  {
    field: 'amenities',
    headerName: 'Amenities',
    sortable: true,
    width: 100,
  },
  
  {
    field: 'createdAt',
    headerName: 'Created On',
    sortable: true,
    width: 100,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.createdAt)
  },
  {
    field: 'updatedAt',
    headerName: 'Updated On',
    sortable: true,
    width: 100,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.updatedAt)
  },
  
];

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export type StayCallback = ((stay:StayRecord) => any);

export interface StaysTableProps {
  stays: StayRecord[];
  onSelect: StayCallback;
}

export default function StaysTable(props: StaysTableProps) {


  return (
    <React.Fragment>
      <Typography>Stays</Typography>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          onCellClick={(params: GridCellParams) => {
            props.onSelect(params.row as StayRecord)
          }}
          rows={props.stays}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  );
}