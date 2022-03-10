import { NextPage } from "next";
import React from "react";

import Directory from "../src/components/Directory/Directory";
import Footer from "../src/components/Footer";
import StaysPage from "../src/StaysPage";

const DirectoryPage: NextPage = () => {
  return (
    <StaysPage>
      <Directory />
      <Footer />
    </StaysPage>
  );
};

export default DirectoryPage;
