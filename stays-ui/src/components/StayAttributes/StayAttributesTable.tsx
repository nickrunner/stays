import * as React from 'react';
import { StayRecord } from '../../../../common/models/Stay';
import { Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';
import { StayAttributeRecord, StayAttributeType } from '../../../../common/models/StayAttributes';

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
    field: 'icon',
    headerName: 'Icon',
    sortable: false,
    width: 200,
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

export type StayAttributeCallback = ((stayAttribute:StayAttributeRecord) => any);

export interface StayAttributesTableProps {
  type: StayAttributeType;
  stayAttributes: StayAttributeRecord[];
  onSelect: StayAttributeCallback;
}

export default function StaysTable(props: StayAttributesTableProps) {


  return (
    <React.Fragment>
      <Typography>Stays</Typography>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          onCellClick={(params: GridCellParams) => {
            props.onSelect(params.row as StayAttributeRecord)
          }}
          rows={props.stayAttributes}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  );
}