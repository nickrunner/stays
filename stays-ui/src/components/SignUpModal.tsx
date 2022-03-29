import { Modal, Paper } from "@mui/material";
import React from "react";

import SignUp from "./SignUp";

export default function SignUpModal(props: any) {
  function closeSignUp() {
    console.log("Close Sign Up");
    props.onClose();
  }

  return (
    <Modal
      open={props.open}
      aria-labelledby="open sign up form"
      aria-describedby="form for signing up as a user"
      onClose={() => {
        closeSignUp();
      }}>
      <React.Suspense fallback={<p>Waiting...</p>}>
        <Paper
          sx={{
            maxWidth: { xs: 400, sm: 800 },
            p: 5,
            maxHeight: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 300, md: 400 },
            bgcolor: "background.paper",
            border: "0px solid #000",
            boxShadow: 24
          }}>
          <SignUp />
        </Paper>
      </React.Suspense>
    </Modal>
  );
}
