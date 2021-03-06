import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as React from "react";

import { UserClient } from "../../../src/clients/userClient";
import CmsFrame from "../../../src/components/CmsFrame";
import Copyright from "../../../src/components/Copyright";
import UsersTable from "../../../src/components/User/UsersTable";
import StaysPage from "../../../src/StaysPage";
import { UserRecord } from "../../models";

function UsersCmsContent() {
  const [users, setUsers] = React.useState<UserRecord[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<UserRecord | undefined>(undefined);

  const getUsers = async () => {
    const users = await new UserClient().getUsers({});
    setUsers(users);
  };

  React.useEffect(() => {
    getUsers();
    return;
  }, []);

  function handleUserSelection(user: UserRecord) {
    console.log("User selected: ", { user });
    setSelectedUser(user);
  }

  return (
    <StaysPage>
      <Box sx={{ display: "flex" }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "row" }}>
                <Button variant="contained" sx={{ m: 1, width: 200 }}>
                  <AddIcon />
                  Add User
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200 }}
                  disabled={selectedUser == undefined}>
                  <EditIcon />
                  Edit User
                </Button>
                <Button
                  variant="contained"
                  sx={{ m: 1, width: 200, bgcolor: "error.main" }}
                  disabled={selectedUser == undefined}>
                  <DeleteIcon />
                  Delete User
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 600
                }}>
                <UsersTable users={users} onSelect={handleUserSelection} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 600,
                  overflow: "auto"
                }}></Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </StaysPage>
  );
}

export default function UsersCms() {
  return <UsersCmsContent />;
}
