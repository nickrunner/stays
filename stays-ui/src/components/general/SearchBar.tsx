import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SearchIcon from "@mui/icons-material/Search";
import { Box, InputAdornment, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import React from "react";

export default function SearchBar(props: any) {
  const [phrase, setPhrase] = React.useState("");

  function handleChange(value: string) {
    setPhrase(value);
    console.log("Search Phase is " + phrase);
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
        width: props.width,
        height: props.height,
        p: "2px 4px",
        mt: 1,
        display: "flex",
        alignItems: "center"
      }}>
      <TextField
        sx={{ width: "100%", bgcolor: "background.default", borderRadius: 1 }}
        onChange={(event) => handleChange(event.target.value)}
        placeholder={props.placeholder}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "primary.main" }} />
            </InputAdornment>
          )
        }}></TextField>
    </Box>
  );
}
