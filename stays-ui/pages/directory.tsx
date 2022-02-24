import { Grid } from "@mui/material";
import React from "react";
import { StayRecord } from "../../common/models/Stay";
import { StayClient } from "../src/clients/stayClient";
import { Nav } from "../src/components/AppBar/AppBar";
import Footer from "../src/components/Footer";
import StayDirectoryCard from "../src/components/Stay/StayDirectoryCard";
import StaysPage from "../src/StaysPage";


export default function Directory() {
  const[staysArr, setStaysArr] = React.useState<StayRecord[]>([]);
  let lastKey = 0;

  const getStays = async() => {
    console.log("GETTING STAYS "+lastKey);
    const newStays = await new StayClient().getStays(
      {
        enable: true
      },
      {
        lastEvaluatedKey: lastKey,
        count: 10
      }
    );
    for(const s of newStays){
      setStaysArr(staysArr => {
        return [...staysArr, s]
      });
    }
    lastKey = lastKey + 10;
  }

  async function handleScroll(){
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight -40) {
      await getStays();
    }
  }

  React.useEffect(() => {
      getStays();
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll)
  }, []);

    
  return (
    
    <StaysPage>
        <Nav transparent={false} />
        <Grid container justifyContent="center" spacing={3} sx={{pl:10, pr:10, bgcolor:"background.default"}}>
          {staysArr.map((stay) => (
            <Grid key={stay.id} item>
              <StayDirectoryCard stay={stay}/>
            </Grid>
          ))}
        </Grid>
        <Footer />
    </StaysPage>
  );
}


