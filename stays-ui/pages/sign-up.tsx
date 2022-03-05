import Container from '@mui/material/Container';
import { NextPage } from 'next';
import * as React from 'react';

import { Nav } from '../src/components/AppBar/AppBar';
import Copyright from '../src/components/Copyright';
import SignUp from '../src/components/SignUp';
import StaysPage from '../src/StaysPage';

const SignUpPage: NextPage = () => {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <Container component="main" maxWidth="xs">
        <SignUp />
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </StaysPage>
  );
};

export default SignUpPage;
