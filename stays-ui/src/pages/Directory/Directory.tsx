import { Container, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import { StayClient } from "../../clients/stayClient";
import { Nav } from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer";
import StayDirectoryCard from "../../components/Stay/StayDirectoryCard";
import UnderConstruction from "../../components/UnderConstruction";
import { StayApplicationStatus, StayRecord } from "../../models/Stay";
import { theme } from "../../Theme";
import StaysPage from "../StaysPage";


export default function Directory() {
  const[stays, setStays] = React.useState<StayRecord[]>([]);

  
    const getStays = async() => {
      const stays = await new StayClient().getStays({
        enable: true
      });
      setStays(stays);
    }
    React.useEffect(() => {
        getStays();
        return;
    }, []);

    
  return (
    
    <StaysPage>
        <Nav transparent={false} />
        <Grid container justifyContent="center" spacing={3} sx={{pl:10, pr:10, bgcolor:"background.default"}}>
          {stays.map((stay) => (
            <Grid key={stay.id} item>
              <StayDirectoryCard stay={stay}/>
            </Grid>
          ))}
        </Grid>
        <Footer />
    </StaysPage>
  );
}


