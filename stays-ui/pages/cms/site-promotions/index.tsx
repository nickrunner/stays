import type { NextPage } from "next";
import Head from "next/head";
import React from "react";

import SitePromotionCms from "../../../src/components/cms/SitePromotionCms";
import StaysPage from "../../../src/StaysPage";

const SitePromotionsCmsPage: NextPage = () => {
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
        <SitePromotionCms />
      </StaysPage>
    </div>
  );
};

export default SitePromotionsCmsPage;
