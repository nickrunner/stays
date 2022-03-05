import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { Box, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';

export default function SearchBar(props: any) {
  const [phrase, setPhrase] = React.useState('');

  function handleChange(value: string) {
    setPhrase(value);
    console.log('Search Phase is ' + phrase);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    props.onSearch(phrase);
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center'
      }}>
      <TextField
        onChange={(event) => handleChange(event.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Stays Directory"
        inputProps={{ 'aria-label': 'search stays directory' }}>
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <KeyboardReturnIcon />
        </IconButton>
      </TextField>
    </Box>
  );
}
