import React from "react";
import type { NextPage } from 'next';
import ComingSoon from "../src/components/ComingSoon/ComingSoon";
import Head from "next/head";


const ComingSoonPage: NextPage = () => {
    return (
        <div>
          <Head>
                <title>Stays - Coming Soon!</title>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta name="description" content="Direct booking for unique vacation rentals and short-term rentals"/>
                <meta name="keywords" content="vacation, rental, unique, host, property, stay, influencer"/>
          </Head>
          <ComingSoon />
        </div>
    );
}

export default ComingSoonPage

