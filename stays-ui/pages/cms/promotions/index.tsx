import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import PromotionCms from "../../../src/components/cms/PromotionCms";
import StaysPage from "../../../src/StaysPage";

const PromotionsCmsPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Stays CMS - Promotions</title>
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
      <StaysPage>
        <PromotionCms />
      </StaysPage>
    </div>
  );
};

export default PromotionsCmsPage;
