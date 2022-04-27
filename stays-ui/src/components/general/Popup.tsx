import CloseIcon from "@mui/icons-material/Close";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import React, { PropsWithChildren } from "react";

export interface PopupProps {
  close: () => void;
  submit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function Popup(props: PropsWithChildren<PopupProps>) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    props.submit(event);
  }
  return (
    <React.Fragment>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          maxWidth: { xs: 500, sm: 800 },
          maxHeight: 800,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          border: "0px solid #000",
          boxShadow: 24
        }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", p: 1, pb: 0 }}>
          <IconButton color="primary" aria-label="close waitlist modal" onClick={props.close}>
            <CloseIcon />
          </IconButton>
        </Box>
        {props.children}
      </Paper>
    </React.Fragment>
  );
}
