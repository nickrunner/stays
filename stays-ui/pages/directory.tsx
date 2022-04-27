import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import { StayClient } from "../src/clients/stayClient";
import Directory from "../src/components/Directory/Directory";
import Footer from "../src/components/Footer";
import { Stay } from "../src/models";
import StaysPage from "../src/StaysPage";

const DirectoryPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Directory />
      <Footer />
    </StaysPage>
  );
};

export default DirectoryPage;
