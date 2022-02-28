import { Box, Grid } from "@mui/material";
import React from "react";
import { StayRecord } from "../../common/models/Stay";
import { StayClient } from "../src/clients/stayClient";
import { Nav } from "../src/components/AppBar/AppBar";
import Footer from "../src/components/Footer";
import SearchBar from "../src/components/SearchBar";
import StayDirectoryCard from "../src/components/Directory/StayDirectoryCard";
import StaysPage from "../src/StaysPage";
import Directory from "../src/components/Directory/Directory";
import { NextPage } from "next";

const DirectoryPage: NextPage = () => {
  return (
    <StaysPage>
      <Nav transparent={false} />
      <Directory /> 
      <Footer />
    </StaysPage>
  );
}

export default DirectoryPage;

