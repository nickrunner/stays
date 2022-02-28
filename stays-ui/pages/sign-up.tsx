import * as React from 'react';
import Container from '@mui/material/Container';
import Copyright from '../src/components/Copyright';
import { Nav } from '../src/components/AppBar/AppBar';
import StaysPage from '../src/StaysPage';
import { NextPage } from 'next';
import SignUp from '../src/components/SignUp';

const SignUpPage: NextPage = () => {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <Container component="main" maxWidth="xs" >
        <SignUp /> 
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </StaysPage>
  );
}

export default SignUpPage;