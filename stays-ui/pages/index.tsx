import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import ComingSoon from "../src/components/ComingSoon/ComingSoon";
import StaysPage from "../src/StaysPage";

const ComingSoonPage: NextPage = () => {
  return (
    <StaysPage noLogin="true">
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
      <ComingSoon />
    </StaysPage>
  );
};

export default ComingSoonPage;
