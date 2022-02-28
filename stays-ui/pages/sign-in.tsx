import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../src/components/Copyright';
import { Nav } from '../src/components/AppBar/AppBar';
import StaysPage from '../src/StaysPage';
import SignIn from '../src/components/SignIn';
import { NextPage } from 'next';

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
}

export default SignInPage;