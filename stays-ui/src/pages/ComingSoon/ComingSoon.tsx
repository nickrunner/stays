import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import StaysPage from "../StaysPage";
import { Box, TextField, Paper, Avatar, FormControlLabel, Checkbox } from "@mui/material";
import {images} from "../../content";
import { LoadingButton } from "@mui/lab";
import Jumbotron from "../../components/Jumbotron";
import "./ComingSoon.css";
import { globalContext } from "../../GlobalStore";
import { WaitlistClient } from "../../clients/waitlistClient";

export default function ComingSoon() {
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
  
    const useStyles = makeStyles(theme => ({
        igIcon: {
          marginRight: "8px",
          marginLeft: "8px"
        },
        facebookIcon: {
          marginRight: "8px",
          marginLeft: "8px"
        },
        logo: {
          maxWidth: "600px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginBottom: "20px",
          width: "50%"
        },
        mockup: {
          maxWidth: "500px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "20px",
          width: "50%"
        },
        heroContent: {
          padding: 5
        },
        comingSoon: {
          marginTop: "30px",
          lineHeight: "1.5"
        },
        HeroImage: {
          opacity: 0.3,
        }
      }));
      const classes = useStyles();

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

    function getBackground(){
      return globalState.mobile ? "https://static.wixstatic.com/media/d4ce6e_ce7e64141e1e4a539669c7227f1c0b23~mv2.jpg/v1/fill/w_2000,h_1313,al_c,q_90/d4ce6e_ce7e64141e1e4a539669c7227f1c0b23~mv2.jpg,%20https://static.wixstatic.com/media/d4ce6e_f549d9b6522044bc9079a4dc715e6482~mv2.jpg/v1/fill/w_2399,h_1350,al_c,q_90,usm_0.66_1.00_0.01/d4ce6e_f549d9b6522044bc9079a4dc715e6482~mv2.jpg,%20https://static.wixstatic.com/media/d4ce6e_ec05850186a94db485e74b04875022e0~mv2.png/v1/fill/w_1015,h_1354,al_c,usm_0.66_1.00_0.01/d4ce6e_ec05850186a94db485e74b04875022e0~mv2.png"
      : images.dotMap
    }

    function getMockups(){
      return globalState.mobile ? 
      [
        "https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Doubles%202.png?alt=media&token=89123729-64ff-4977-9316-2ffac2248dc4",
        "https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Doubles%201.png?alt=media&token=6c7357b1-a15b-4895-8ccd-0ba8583e5b27"
      ]
        :
        [
          "https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Computer%20(Laptop).png?alt=media&token=964e9ce6-d2af-444e-a5a2-15f16ceb670a",
          "https://firebasestorage.googleapis.com/v0/b/stays-prod.appspot.com/o/content%2FStays%20Mockups%20-%20Singles%203.png?alt=media&token=a77222f1-ac8d-45aa-9609-f19fb285b6d1"
        ] 
    }
    
    return (
        <StaysPage>
        <React.Fragment>
        <CssBaseline />

          <Jumbotron backgroundImage={getBackground()} />

            <Container maxWidth="sm">


            <div className={classes.heroContent}>
                <img src={images.logo.purple} alt="logo" className={classes.logo} />
                <Typography
                variant="h5"
                align="center"
                color="textPrimary"
                gutterBottom
                >
                Coming in June
                </Typography>
               
            </div>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              
              <Paper component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, p:3, alignItems: 'center', }}>
            
                <TextField
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
              </Box>

              <Grid container spacing={1} alignItems="center" justifyContent="center">
                {getMockups().map((mockup)=> (

                    <img key={mockup} src={mockup} alt="mockup" className={classes.mockup} />
                  // </Grid>
                ))}
                </Grid>
           
              
           
            <Box sx={{mt:5}}>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Link
                    href="https://www.facebook.com/americanstays/"
                    target="_blank"
                >
                    <FacebookIcon
                    className={classes.facebookIcon}
                    fontSize="large"
                    />
                </Link>
                <Link href="https://www.instagram.com/americanstays/?hl=en" target="_blank">
                    <InstagramIcon fontSize="large" className={classes.igIcon} color="primary" />
                </Link>
                </Grid>
              </Box>
        </Container>
        </React.Fragment>
        </StaysPage>
    );
}