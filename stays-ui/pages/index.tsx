import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import Home from "../src/components/Home/Home";
import StaysPage from "../src/StaysPage";

const HomePage: NextPage = () => {
  return (
    <StaysPage>
      <Head>
        <title>Stays - Coming Soon!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="description"
          content="Direct booking for unique vacation rentals and short-term rentals"
        />
        <meta
          name="keywords"
          content="vacation, rental, unique, host, property, stay, influencer"
        />
      </Head>
      <Home />
    </StaysPage>
  );
};

export default HomePage;
