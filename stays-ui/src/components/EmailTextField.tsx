import { TextField, Typography } from "@mui/material";
import React from "react";

export default function EmailTextField() {
  const [emailErr, setEmailErr] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");

  function handleEmailChange(email: string) {
    setEmail(email);
    validateEmail();
  }

  function validateEmail() {
    setEmailErr(false);
    setErrMsg("");
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      if (email !== "") {
        setEmailErr(true);
        setErrMsg("Please enter a valid email address.");
      }
    }
  }

  return (
    <div>
      <TextField
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        onChange={(event) => handleEmailChange(event.target.value)}
        error={emailErr}
      />
      <Typography variant="subtitle2">{errMsg}</Typography>
    </div>
  );
}
