import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stay, StayRecord } from '../../../models/Stay';
import { StayClient } from '../../../clients/stayClient';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'createdAt',
    headerName: 'Created On',
    sortable: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.createdAt).toDateString()
  },
  {
    field: 'updatedAt',
    headerName: 'Updated On',
    sortable: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => new Date(params.row.createdAt).toDateString()
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