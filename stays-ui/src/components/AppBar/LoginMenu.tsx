import { AccountCircle, Reorder } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import * as React from 'react';

import { Role, UserMembership } from '../../../../common/models/User';
import { AuthClient } from '../../clients/authClient';
import { globalContext } from '../../GlobalStore';
import { StaysAppBarProps } from './AppBar';

export default function LoginMenu(props: StaysAppBarProps) {
  const router = useRouter();
  const { globalState, dispatch } = React.useContext(globalContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    console.log('Global state: ', { globalState });
    setAnchorEl(null);
  };

  async function onSignOutClick() {
    await new AuthClient().signOut();
    router.push('/sign-in');
  }

  function hasRole(role: Role): boolean {
    if (!globalState.isSignedIn) {
      return false;
    }
    if (!globalState.self) {
      return false;
    }
    if (!globalState.self.roles) {
      return false;
    }
    return globalState.self.roles.includes(role);
  }

  function hasMembership(tier: UserMembership): boolean {
    if (!globalState.isSignedIn) {
      return false;
    }
    if (!globalState.self) {
      return false;
    }
    if (!globalState.self.userMembership) {
      return false;
    }
    return globalState.self.userMembership == tier;
  }

  return (
    <div>
      <Button
        sx={{ height: 50, width: 120, p: 1, mt: 1 }}
        size="medium"
        variant="contained"
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        margin-top="5"
        onClick={handleClick}>
        <Box sx={{ mt: 1 }}>
          <MenuIcon fontSize="large" sx={{ p: 0.1 }} />
          <AccountCircle fontSize="large" sx={{ p: 0.1 }} />
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <MenuItem
          onClick={() => router.push('/stayers/premium/sign-up')}
          sx={{
            display:
              globalState.isSignedIn && !hasMembership(UserMembership.Premium) ? 'block' : 'none'
          }}>
          <Typography variant="subtitle1">Upgrade to Premium</Typography>
        </MenuItem>

        <Divider sx={{ display: globalState.isSignedIn ? 'block' : 'none' }}></Divider>

        <MenuItem
          sx={{ display: globalState.isSignedIn ? 'none' : 'block' }}
          onClick={() => router.push('/sign-up')}>
          <Typography variant="subtitle1">Create free account</Typography>
        </MenuItem>

        <MenuItem
          sx={{ display: globalState.isSignedIn ? 'block' : 'none' }}
          onClick={() => onSignOutClick()}>
          <Typography>Sign out</Typography>
        </MenuItem>

        <MenuItem
          sx={{ display: globalState.isSignedIn ? 'block' : 'none' }}
          onClick={() => router.push('/account')}>
          <Typography>Account Settings</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push('/sign-in')}
          sx={{ display: globalState.isSignedIn ? 'none' : 'block' }}>
          <Typography>Sign in</Typography>
        </MenuItem>

        <Divider />

        <MenuItem onClick={() => router.push('/directory')}>
          <Typography>Find a stay</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push('/hosts')}
          sx={{ display: hasRole(Role.Host) ? 'none' : 'block' }}>
          <Typography>Become a host</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push('/hosts/portal')}
          sx={{ display: hasRole(Role.Host) ? 'block' : 'none' }}>
          <Typography>Host Portal</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push('/stayers')}
          sx={{ display: globalState.isSignedIn ? 'none' : 'block' }}>
          <Typography>Become a member</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => router.push('/cms/dashboard')}
          sx={{ display: hasRole(Role.Admin) || hasRole(Role.Employee) ? 'block' : 'none' }}>
          <Typography>CMS</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
