import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle } from "@mui/icons-material";
import MenuItem from '@mui/material/MenuItem';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import {useNavigate} from "react-router-dom";

export default function LoginMenu() {
  let navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        sx={{height: 50, width:120, p:1, mt:1}}
        size="medium"
        variant='contained'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        margin-top="5"
        onClick={handleClick}>
        <Box sx={{mt:1}}>
          <MenuIcon fontSize="large" sx={{p:0.1}}/>
          <AccountCircle fontSize="large"  sx={{p:0.1}} />
        </Box>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={event => navigate("/sign_up")}>
          <Typography variant="subtitle1">Create account</Typography>
        </MenuItem>
        <MenuItem onClick={event => navigate("/sign_in")}>
          <Typography>Sign in</Typography>
          </MenuItem>
        <Divider />
        <MenuItem onClick={event => navigate("/search")}>
          <Typography>Find a stay</Typography>
          </MenuItem>
        <MenuItem onClick={event => navigate("/hosts")}>
          <Typography>Become a host</Typography>
        </MenuItem>
        <MenuItem onClick={event => navigate("/stayers")}>
          <Typography>Become a member</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}