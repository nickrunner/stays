import { Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import * as React from "react";

import { UserClient } from "../../clients/userClient";
import { UserRecord } from "../../models";

function dateString(timestamp: number): string {
  const date: Date = new Date(timestamp);
  return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}

const columns: GridColDef[] = [
  {
    field: "email",
    headerName: "Email",
    sortable: true,
    width: 200,
    editable: false
  },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`
  },
  {
    field: "roles",
    headerName: "Roles",
    sortable: true,
    width: 150,
    editable: false
  },
  {
    field: "stayerMembership",
    headerName: "Stayer",
    width: 150,
    editable: false
  },
  {
    field: "hostMembership",
    headerName: "Host",
    width: 150,
    editable: false
  },
  {
    field: "lastActive",
    headerName: "Active",
    sortable: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.lastActive)
  },
  {
    field: "createdAt",
    headerName: "Created",
    sortable: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.createdAt)
  },

  {
    field: "updatedAt",
    headerName: "Updated",
    sortable: true,
    width: 200,
    valueGetter: (params: GridValueGetterParams) => dateString(params.row.updatedAt)
  }
];

export type UserCallback = (user: UserRecord) => any;
export interface UsersTableProps {
  users: UserRecord[];
  onSelect: UserCallback;
}

export default function UsersTable(props: UsersTableProps) {
  const [users, setUsers] = React.useState<UserRecord[]>([]);

  React.useEffect(() => {
    const getUsers = async () => {
      const users = await new UserClient().getUsers({});
      setUsers(users);
    };
    getUsers();
    return;
  }, []);

  return (
    <React.Fragment>
      <Typography>Users</Typography>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          onCellClick={(params: GridCellParams) => {
            props.onSelect(params.row as UserRecord);
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
