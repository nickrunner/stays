import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { User, UserRecord } from '../../../models/User';
import { StayClient } from '../../../clients/stayClient';
import { Checkbox, Typography } from '@mui/material';
import { UserClient } from '../../../clients/userClient';
import { DataGrid, GridColDef, GridValueGetterParams, GridCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: 'email',
    headerName: 'Email',
    sortable: true,
    width: 250,
    editable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'membership',
    headerName: 'Membership',
    width: 150,
    editable: false,
  },
  {
    field: 'roles',
    headerName: 'Roles',
    sortable: true,
    width: 150,
    editable: false,
  },

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
export type UserCallback = ((user:UserRecord) => any);
export interface UsersTableProps {
  users: UserRecord[];
  onSelect: UserCallback;
}

export default function UsersTable(props: UsersTableProps) {

    const[users, setUsers] = React.useState<UserRecord[]>([]);

    React.useEffect(() => {
        const getUsers = async() => {
            const users = await new UserClient().getUsers({});
            setUsers(users);
        }
        getUsers();
        return
    }, []);

  return (
    <React.Fragment>
      <Typography>Users</Typography>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          onCellClick={(params: GridCellParams) => {
            props.onSelect(params.row as UserRecord)
          }}
          rows={users}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>
    </React.Fragment>
  );
}