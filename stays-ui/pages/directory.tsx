import { Grid } from "@mui/material";
import React from "react";
import { StayRecord } from "../../common/models/Stay";
import { StayClient } from "../src/clients/stayClient";
import { Nav } from "../src/components/AppBar/AppBar";
import Footer from "../src/components/Footer";
import StayDirectoryCard from "../src/components/Stay/StayDirectoryCard";
import StaysPage from "../src/StaysPage";


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


