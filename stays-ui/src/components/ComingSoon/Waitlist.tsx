import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { WaitlistClient } from "../../clients/waitlistClient";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {content} from "../../content";
import { AuthClient } from "../../clients/authClient";

export default function Waitlist(props: any){

  const [msg, setMsg] = React.useState("");  
  const [msgColor, setMsgColor] = React.useState("text.primary");
  const [isStayer, setIsStayer] = React.useState(false);
  const [isHost, setIsHost] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [submitEnabled, setSubmitEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);

  function enableSubmit(stayer:boolean, host:boolean){
    if((host===true) || (stayer===true)){
      setSubmitEnabled(true);
    }
    else{
      setSubmitEnabled(false);
    }
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMsgColor("text.primary");
    setMsg("");

    if(!validateEmail(email)){
      setMsgColor("error.main");
      setMsg("Please enter a valid email address");
      setLoading(false);
      setEmailErr(true);
      return;
    }

    if(!new AuthClient().isEmailValid(email)){
      setMsgColor("error.main");
      setMsg("Please enter a valid email address");
      setLoading(false);
      setEmailErr(true);
      return;
    }

    try{
      await new WaitlistClient().addToWaitlist(email, isStayer, isHost);
      setMsgColor("success.main");
      setMsg("You have been added to the waitlist! We will notify you when it's time for lift-off.")
      setSubmitEnabled(false);
    }
    catch(err: any){
      console.log("Error adding to waitlist:: "+ JSON.stringify(err, null, 2));
      console.log("message: "+err.message);
      if(err.message === "Request failed with status code 409"){
        setMsgColor("success.main");
        setMsg("You are already on the waitlist!");
        setSubmitEnabled(false);
      }
      else{
        setMsgColor("error.main");
        setMsg("There was a problem adding you to the waitlist. Try again in a few moments.");
      }
    }
   
    setLoading(false);
  }
  

  function handleEmailChange(email: string){
    setEmailErr(false);
    setEmail(email);
    validateEmail(email);
  }

  function handleStayerChange(state: boolean){
    console.log("Is Stayer: "+isStayer);
    setIsStayer(state);
    console.log("After change: "+isStayer);
    enableSubmit(state, isHost);
  }

  function handleHostChanged(state: boolean){
    setIsHost(state);
    enableSubmit(isStayer, state);
  }


  function validateEmail(email: string){
    enableSubmit(isStayer, isHost);
    if(!email.toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    )
    {
      return false;
    }
    else{
      return true;
    }
  }
    return (
        <Paper 
        component="form" 
        onSubmit={handleSubmit} 
        noValidate 
        sx={{
            maxWidth: "300",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {xs:300, md:400},
            bgcolor: 'background.paper',
            border: '0px solid #000',
            boxShadow: 24,
            p: 4,
          }}>

            <img height="70" src={content.images.logo.purple} alt="Stays Logo"></img>

            <Typography variant="subtitle1" align="center" sx={{mt:2, mb:2}}>
                Be the first to know about our beta launch!
            </Typography>
            <TextField
              sx={{mb:5}}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={event => handleEmailChange(event.target.value)}
              error={emailErr}
            />
            <Box sx={{display:"inline",gap:2}}>
              <FormControlLabel 
                onChange={(e, checked) => {
                  handleStayerChange(checked);
                }}
                control={<Checkbox />} 
                label="I am a traveler" />

              <FormControlLabel 
                onChange={(e, checked) => {
                  handleHostChanged(checked);
                }}
                control={<Checkbox />} 
                label="I am a host" />
            </Box>

            <Box sx={{m:2}}>
            <Typography 
              variant="subtitle2"
              color={msgColor}>
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
            size="large"
          >
            Submit
          </LoadingButton>
        </Paper>
    );
}