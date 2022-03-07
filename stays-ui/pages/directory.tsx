import { NextPage } from "next";
import React from "react";

import { Nav } from "../src/components/AppBar/AppBar";
import Directory from "../src/components/Directory/Directory";
import Footer from "../src/components/Footer";
import StaysPage from "../src/StaysPage";

const DirectoryPage: NextPage = () => {
  function handleSearch(phrase: string) {}

  return (
    <StaysPage>
      <Nav variant="search" transparent={false} onSearch={(phrase) => handleSearch(phrase)} />
      <Directory />
      <Footer />
    </StaysPage>
  );
};

export default DirectoryPage;
