import { Box, Grid } from '@mui/material';
import React from 'react';

import { StayRecord } from '../../../../common/models/Stay';
import { StayClient } from '../../clients/stayClient';
import SearchBar from '../SearchBar';
import StayDirectoryCard from './StayDirectoryCard';

export default function Directory() {
  const [staysArr, setStaysArr] = React.useState<StayRecord[]>([]);
  const [searchPhrase, setSearchPhrase] = React.useState('');
  let lastKey = 0;

  const getStays = async () => {
    console.log('GETTING STAYS with search: ' + searchPhrase);
    // const newStays = await new StayClient().getStays(
    //   searchPhrase,
    //   {
    //     enable: true
    //   },
    //   {
    //     lastEvaluatedKey: lastKey,
    //     count: 10
    //   }
    // );
    // for(const s of newStays){
    //   setStaysArr(staysArr => {
    //     return [...staysArr, s]
    //   });
    // }
    lastKey = lastKey + 10;
  };

  async function handleScroll() {
    // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight -40) {
    //   await getStays();
    // }
  }

  React.useEffect(() => {
    getStays();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  async function handleSearch(phrase: string) {
    setStaysArr([]);
    setSearchPhrase(phrase);
    console.log('Searching with phrase: ' + phrase);
    const newStays = await new StayClient().getStays(phrase, {
      enable: true
    });
    for (const s of newStays) {
      setStaysArr((staysArr) => {
        return [...staysArr, s];
      });
    }
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          p: 5,
          width: 400
        }}>
        <SearchBar onSearch={(phrase: string) => handleSearch(phrase)} />
      </Box>
      <Grid
        container
        justifyContent="center"
        spacing={5}
        sx={{ pl: 10, pr: 10, bgcolor: 'background.default' }}>
        {staysArr.map((stay) => (
          <Grid key={stay.id} item xs={11} sm={5} md={5} lg={3} xl={2}>
            <StayDirectoryCard stay={stay} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
