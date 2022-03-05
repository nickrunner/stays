import Container from "@mui/material/Container";
import { NextPage } from "next";
import * as React from "react";

import { Nav } from "../src/components/AppBar/AppBar";
import Copyright from "../src/components/Copyright";
import SignIn from "../src/components/SignIn";
import StaysPage from "../src/StaysPage";

const SignInPage: NextPage = () => {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <Container component="main" maxWidth="xs">
        <SignIn />
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </StaysPage>
  );
};

export default SignInPage;
