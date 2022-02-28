import { LoadingButton } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, Paper, TextField, Accordion, AccordionSummary, Typography, AccordionDetails, Grid, IconButton } from "@mui/material";
import React from "react";
import { WaitlistClient } from "../../clients/waitlistClient";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {content} from "../../content";
import { AuthClient } from "../../clients/authClient";
import Image from "next/image";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';



export default function Waitlist(props: any){

  const [msg, setMsg] = React.useState("");  
  const [msgColor, setMsgColor] = React.useState("text.primary");
  const [isStayer, setIsStayer] = React.useState(false);
  const [isHost, setIsHost] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [fnErr, setFnErr] = React.useState(false);
  const [lnErr, setLnErr] = React.useState(false);
  const [submitEnabled, setSubmitEnabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);
  const [promo, setPromo] = React.useState("");
  const [promoErr, setPromoErr] = React.useState(false);

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

    if(!firstName){
      setFnErr(true);
      setLoading(false);
      setMsgColor("error.main");
      setMsg("First name required");
      return;
    }

    if(!lastName){
      setLnErr(true);
      setLoading(false);
      setMsgColor("error.main");
      setMsg("Last name required");
      return;
    }

    if(!validateEmail(email)){
      setMsgColor("error.main");
      setMsg("Please enter a valid email address");
      setLoading(false);
      setEmailErr(true);
      return;
    }

    const waitlistClient = new WaitlistClient();
    const authClient = new AuthClient();
  
    try{
      const isEmailValid = await authClient.isEmailValid(email);
      if(!isEmailValid){
        setMsgColor("error.main");
        setMsg("Please enter a valid email address");
        setLoading(false);
        setEmailErr(true);
        return;
      }
      if(promo != ""){
        const isValid = await waitlistClient.isPromoCodeValid(promo);
        if(!isValid){
          setMsgColor("error.main");
          setMsg("Promo code not valid");
          setLoading(false);
          setPromoErr(true);
          return;
        }
      }
      await waitlistClient.addToWaitlist(email, isStayer, isHost, firstName, lastName, promo);
      setMsgColor("success.main");
      setMsg("You have been added to the waitlist! We will notify you when it's time for lift-off.")
      setSubmitEnabled(false);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  function handleFirstNameChange(value: string) {
    setFnErr(false);
    setFirstName(value);
  }

  function handleLastNameChange(value: string) {
    setLnErr(false);
    setLastName(value);
  }

  function handlePromoCodeChange(value: string) {
    setPromoErr(false);
    setPromo(value);
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
            
            maxWidth: {xs:400, sm:800},
            maxHeight: 600,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: {xs:300, md:400},
            bgcolor: 'background.paper',
            border: '0px solid #000',
            boxShadow: 24,
          }}>
          
          
          
          <Box sx={{width:"100%", display:"flex", justifyContent:"flex-start", p:1, pb:0}}>
            <IconButton color="primary" aria-label="close waitlist modal" onClick={props.close}>
              <CloseIcon />
            </IconButton>
            
          </Box>

          <Box sx={{ display:"flex", justifyContent:"center"}}>
            
              <Image 
                src={content.images.logo.purple}
                height="50"
                width="180"
                alt="Stays Logo"> 
              </Image>
            </Box>
          
          

            <Grid container spacing={2} 
              sx={{
                mt:0, 
                pr: 4,
                pl:4,
                overflow: 'auto'
              }}>
              <Grid item xs={12} sm={6} >
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    onChange={(event:any) => handleFirstNameChange(event.target.value)}
                    id="firstName"
                    label="First Name"
                    error={fnErr}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    onChange={(event:any) => handleLastNameChange(event.target.value)}
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
                  <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{color:"primary.main"}} />}
                        aria-controls="promo-code-content"
                        id="promo-code-header"
                    >
                        <Typography 
                        variant="body1"
                        color="text.primary" 
                        gutterBottom sx={{mt:2}}>
                            Have a promo code? 
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <TextField
                        fullWidth
                        id="promoCode"
                        label="Enter code here"
                        name="promoCode"
                        onChange={event => handlePromoCodeChange(event.target.value)}
                        error={promoErr}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel 
                  onChange={(e:any, checked: boolean) => {
                    handleStayerChange(checked);
                  }}
                  control={<Checkbox />} 
                  label="I am a traveler" />
                </Grid>
                <Grid item xs={6}>
                  <FormControlLabel 
                    onChange={(e:any, checked:boolean) => {
                      handleHostChanged(checked);
                    }}
                    control={<Checkbox />} 
                    label="I am a host" />
                </Grid>
              </Grid>
            <Box sx={{display:"inline",gap:2, mt:5}}>
              
            </Box>

            
            
            <Box sx={{p:4, pt:0, width:"100%", justifyContent:"center", textAlign:"center"}}>
              
                <Typography 
                sx={{margin:"auto", pb:1}}
                  variant="subtitle2"
                  color={msgColor}>
                  {msg}
                </Typography>
             
              <LoadingButton
                type="submit"
                fullWidth
                loading={loading}
                disabled={!submitEnabled}
                loadingPosition="end"
                endIcon={<RocketLaunchIcon/>}
                variant="contained"
                size="large"
              >
                Submit
              </LoadingButton>
            </Box>
        </Paper>
    );
}