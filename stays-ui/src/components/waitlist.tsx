import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { WaitlistClient } from "../clients/waitlistClient";
import { globalContext } from "../GlobalStore";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {images} from "../content";

export default function Waitlist(props: any){

  const [msg, setMsg] = React.useState("");  
  const [emailErr, setEmailErr] = React.useState(false);
  const [isStayer, setStayer] = React.useState(false);
  const [isHost, setHost] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [submitEnabled, setSubmitEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const {globalState} = React.useContext(globalContext);

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try{
      await new WaitlistClient().addToWaitlist(email, isStayer, isHost);
      setMsg("You have been added to the waitlist!  We will notify you when we are ready to launch.")
    }
    catch(err: any){
      console.log("Error adding to waitlist:: "+ JSON.stringify(err, null, 2));
      console.log("message: "+err.message);
      if(err.message === "Request failed with status code 409"){
        setMsg("You are already on the waitlist!");
      }
      else{
        setMsg("There was a problem adding you to the waitlist. Try again in a few moments.");
      }
    }
   
    setLoading(false);
  }
  

      function handleEmailChange(email: string){
        setEmail(email);
        validateEmail();
      }
    

      function validateEmail(){
        if(!email.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        )
        {
          setEmailErr(true);
          setSubmitEnabled(false);
  
        }
        else{
          setSubmitEnabled(true);
        }
        
      }
    return (
        <Paper component="form" onSubmit={handleSubmit} noValidate  sx={{
            marginTop: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p:5
          }}>

                <img height="80" src={images.logo.purple}></img>

                <Typography variant="subtitle1" align="center" >
                   Be the first to know when our beta launch arrives!
                </Typography>
                <TextField
                  sx={{mt:5, mb:5}}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={event => handleEmailChange(event.target.value)}
                  autoFocus
                />
                <FormControlLabel 
                  onChange={(e, checked) => {setStayer(checked)}}
                  checked={isStayer}
                  control={<Checkbox />} 
                  label="I am a traveler" />

                <FormControlLabel 
                  onChange={(e, checked) => {setHost(checked)}}
                  control={<Checkbox />} 
                  label="I am a host" />

                <Box sx={{m:2}}>
                <Typography 
                  variant="subtitle2">
                  {msg}
                </Typography>
                </Box>

                <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                disabled={!submitEnabled}
                loadingPosition="end"
                endIcon={<RocketLaunchIcon/>}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Join the Waitlist
              </LoadingButton>
            </Paper>
    );
}