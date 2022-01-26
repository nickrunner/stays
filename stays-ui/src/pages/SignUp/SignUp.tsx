import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { AccountCircle } from "@mui/icons-material";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Copyright from '../../components/Copyright';
import {theme} from "../../Theme";
import { AuthClient } from '../../clients/authClient';
import { UserClient } from '../../clients/userClient';
import { useNavigate } from "react-router-dom";
import { Link as RouterLink} from "react-router-dom";
import { Nav } from '../../components/AppBar/AppBar';
import StaysPage from '../StaysPage';
import { globalContext } from '../../GlobalStore';

export default function SignUp() {

  let navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");
  const [pwErr, setPwErr] = React.useState(false);
  const [fnErr, setFnErr] = React.useState(false);
  const [lnErr, setLnErr] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [submitEnabled, setSubmitEnabled] = React.useState(false);

  React.useEffect(() => {
      async function redirectIfSignedIn(){
        if(await new AuthClient().isSignedIn()){
          console.log("Signup: redirect. Already signed in");
          navigate("/");
        }
      }
      redirectIfSignedIn();
      return;
  }, []);

  async function signUpWithAuth(email: string, password: string): Promise<boolean>{
    //Create firebase user account
    try{
      await new AuthClient().signUp(email, password);
      return true;
    }
    catch(error: any){
      switch(error.code){
        case "auth/email-already-in-use":
          console.log("Email is in use");
          setErrMsg("The email address: \""+email+"\" is already in use.");
          setEmailErr(true);
          break;
        case "auth/weak-password":
          setErrMsg("Password must be 8 characters and contain at least one digit (0-9).");
          setPwErr(true);
      }
      console.log("removing user from auth");
      try{
        await new AuthClient().removeUser();
      }
      catch{
        console.log("User never created");
      }
      
      setLoading(false);
      return false;
    }
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const email: string = data.get('email') as string;
    const password:string = data.get("password") as string;
    const firstName:string = data.get("firstName") as string;
    const lastName:string = data.get("lastName") as string;

    if(! await signUpWithAuth(email, password)){
      return;
    }
    //Create user in stays database remove auth if something went wrong
    console.log("Creating user in stays");
    try{
      const userClient = new UserClient();
      await userClient.createUser(email, firstName, lastName);
      const user = await userClient.getSelf(); // Just to double check
      console.log("Created new user: ",{ user });
      if(!user){
        console.log("Error: User was not created in stays db.  Removing auth");
        await new AuthClient().removeUser();
        setLoading(false);
        setErrMsg("Stays is experiencing technical difficulties. Please try again in a few moments.");
        return;
      }
    }
    catch(error: any){
      //Back end error: need to delete the user
      console.log("Signup Error!");
      setErrMsg("Stays is experiencing technical difficulties. Please try again in a few moments.");
     
      try{
        await new AuthClient().removeUser();
        setLoading(false);
        return;
      }
      catch{
        setErrMsg("Check internet connection and try again. ");
        setLoading(false);
        return;
      }
    }

    console.log("Signing in with new user: ");
    try{
      await new AuthClient().signIn(email, password);
      if ( await new AuthClient().isSignedIn()){
        setLoading(false);
        navigate("/");
        return;
      }
      else{
        setErrMsg("Check internet connection and try again. ");
      }
    }
    catch{
      setErrMsg("Check internet connection and try again. ");
    }
    console.log("Done!");
    setLoading(false);
    
  };

  function handlePasswordChange(password: string){
    setPassword(password)
    validateForm();
  }

  function handleEmailChange(email: string){
    setEmail(email);
    validateForm();
  }

  function handleFirstNameChange(firstName: string){
    setFirstName(firstName);
    validateForm();
  }

  function handleLastNameChange(lastName: string){
    setLastName(lastName);
    validateForm();
  }

  function validatePassword(){
    const regex = /^[0-9a-zA-Z]+$/;
    if(password.length < 8){
      if(password != ""){
        setPwErr(true);
        setErrMsg("Password must be at least 8 characters.");
      }
      setSubmitEnabled(false);
    }
    else if(!password.match(regex)){
      if(password !== ""){
        setPwErr(true);
        setErrMsg("Password must contain letters and numbers.");
      }
      setSubmitEnabled(false);
    }
  }

  function validateEmail(){
    if(!email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    )
    {
      if(email !== ""){
        setEmailErr(true);
        setErrMsg("Please enter a valid email address.");
      }
      setSubmitEnabled(false);
    }
  }

  function validateFirstName(){
    if(firstName === ""){
      setFnErr(true);
      setErrMsg("First Name Required");
      setSubmitEnabled(false);
    }
  }

  function validateLastName(){
    if(lastName === ""){
      setLnErr(true);
      setErrMsg("Last Name Required");
      setSubmitEnabled(false);
    }
  }


  function validateForm(){
    setPwErr(false);
    setEmailErr(false);
    setLnErr(false);
    setFnErr(false);
    setSubmitEnabled(true);
    setErrMsg("");
    validateEmail();
    validatePassword();
    validateFirstName();
    validateLastName();
  }

  return (
    <StaysPage>
      <Nav transparent={false} />
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange={event => handleFirstNameChange(event.target.value)}
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={fnErr}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={event => handleLastNameChange(event.target.value)}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={lnErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={event => handleEmailChange(event.target.value)}
                  error={emailErr}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={event => handlePasswordChange(event.target.value)}
                  error={pwErr}
                />
              </Grid>
              <Grid item xs={12}>
              <Typography 
                variant="subtitle2">
                {errMsg}
              </Typography>
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              loading={loading}
              disabled={!submitEnabled}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Account
            </LoadingButton>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <RouterLink to="/sign_in">
                  <Link  variant="body2">
                    Already have an account? Sign in here.
                  </Link>
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </StaysPage>
  );
}