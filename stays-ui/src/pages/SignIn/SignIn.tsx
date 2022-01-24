import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ThemeProvider } from '@mui/material/styles';
import {theme} from "../../Theme";
import Copyright from '../../components/Copyright';
import { Link as RouterLink } from "react-router-dom";
import { AuthClient } from '../../clients/authClient';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from "react-router-dom";
import { UserClient } from '../../clients/userClient';
import { Nav } from '../../components/AppBar/AppBar';
import StaysPage from '../StaysPage';
import { globalContext } from '../../GlobalStore';

export default function SignIn() {

  const navigate = useNavigate();
  const [errMsg, setErrMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
      async function redirectIfSignedIn(){
        if(await new AuthClient().isSignedIn()){
          navigate("/");
        }
      }
      redirectIfSignedIn();
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const email: string = data.get('email') as string;
    const password: string = data.get('password') as string;
    setErrMsg("");
    setLoading(true);

    
    try{
      await new AuthClient().signIn(email, password);
    }
    catch(error: any){
      setLoading(false);
      console.log("Caught error: "+error.code);
      switch(error.code){
        case "auth/wrong-password":
          setErrMsg("Password not valid");
          return;
        case "auth/user-not-found":
          setErrMsg("Stays account not found for email address: \""+email+"\"");
          return;
        case "auth/invalid-email":
          setErrMsg("Email address not valid");
          return;
        case "auth/too-many-requests":
          setErrMsg("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.");
          return;
        default:
          setErrMsg("Sign in failed: "+error.message);
          return;
      }
    }
    try{
      setLoading(true);
      const user = await new UserClient().getUserByEmail(email);
      setLoading(false);
      navigate("/");
    }
    catch(error: any){
      setErrMsg("Stays is experiencing technical difficulties.");
    }
    setLoading(false);

  };


  return (
    <StaysPage>
      <Nav transparent={false} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Typography 
                variant="subtitle2">
                {errMsg}
              </Typography>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              loadingPosition='end'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <RouterLink to="/sign_up">
                  <Link href="#" variant="body2">
                    {"Don't have an account? Create one here!"}
                  </Link>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </StaysPage>
  );
}