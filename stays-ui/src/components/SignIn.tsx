import { Copyright } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Container, CssBaseline, Box, Avatar, Typography, TextField, Grid } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AuthClient } from "../clients/authClient";
import { UserClient } from "../clients/userClient";
import StaysPage from "../StaysPage";
import { Nav } from "./AppBar/AppBar";

export default function SignIn() {

  const router = useRouter();
  const [errMsg, setErrMsg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
      async function redirectIfSignedIn(){
        if(await new AuthClient().isSignedIn()){
          console.log("User is signed in... redirecting to home");
          router.push("/");
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
    const authClient = new AuthClient();
    const userClient = new UserClient();
    
    try{
      await authClient.signIn(email, password);
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
      if(await authClient.isSignedIn()){
        setLoading(false);
        router.push("/");
      }
      else{
        setErrMsg("Stays is experiencing technical difficulties. Please try again in a few moments.");
      }
    }
    catch(error: any){
      setErrMsg("Stays is experiencing technical difficulties.");
    }
    setLoading(false);
  }


  return (
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
                <Link href="#">
                  <Typography>
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href={"/sign_up"}>
                  <Typography  variant="body2">
                    {"Don't have an account? Create one here!"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
  );
}