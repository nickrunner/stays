import { Box, Grid } from '@mui/material';
import { NextPage } from 'next';
import React from 'react';

import { StayRecord } from '../../common/models/Stay';
import { StayClient } from '../src/clients/stayClient';
import { Nav } from '../src/components/AppBar/AppBar';
import Directory from '../src/components/Directory/Directory';
import StayDirectoryCard from '../src/components/Directory/StayDirectoryCard';
import Footer from '../src/components/Footer';
import SearchBar from '../src/components/SearchBar';
import StaysPage from '../src/StaysPage';

const DirectoryPage: NextPage = () => {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <Directory />
      <Footer />
    </StaysPage>
  );
};

export default DirectoryPage;
