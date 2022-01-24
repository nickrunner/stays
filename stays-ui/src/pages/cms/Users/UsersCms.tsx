import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Copyright from '../../../components/Copyright';
import { Box, Button, Typography } from '@mui/material';
import StaysTable from './../Stays/StaysTable';
import CmsFrame from './../CmsFrame';
import { StayClient } from '../../../clients/stayClient';
import { StayRecord } from '../../../models/Stay';
import StaysPage from '../../StaysPage';
import { UserRecord } from '../../../models/User';
import UsersTable from './UsersTable';
import { UserClient } from '../../../clients/userClient';
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import JSONPretty from 'react-json-pretty';

function UsersCmsContent() {

    const[users, setUsers] = React.useState<UserRecord[]>([]);
    const[selectedUser, setSelectedUser] = React.useState<UserRecord | undefined>(undefined);

    const getUsers = async() => {
        const users = await new UserClient().getUsers({});
        setUsers(users);
    }

    React.useEffect(() => {
        getUsers();
        return
    }, []);

    function handleUserSelection(user:UserRecord){
        console.log("User selected: ", {user});
        setSelectedUser(user);
    }

  return (
    <StaysPage>
    <Box sx={{ display: 'flex' }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 10, mb: 4 }}>
        <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >

                <Typography style={{overflow:'auto'}}>
                    <JSONPretty data={selectedUser}/>
                </Typography>
            </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
            <Paper
                sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                }}
            >
                <Button variant="contained" sx={{m:2, width:200}}>
                    <AddIcon />
                    Add User
                </Button>
                <Button variant="contained" sx={{m:2, width:200}} disabled={selectedUser == undefined}>
                    <EditIcon />
                    Edit User
                </Button>
                <Button variant="contained" sx={{m:2, width:200, bgcolor:"error.main"}} disabled={selectedUser == undefined}>
                    <DeleteIcon />
                    Delete User
                </Button>
            </Paper>
            </Grid>
            
            <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <UsersTable users={users} onSelect={handleUserSelection}/>
            </Paper>
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