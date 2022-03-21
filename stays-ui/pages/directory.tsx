import { NextPage } from "next";
import React from "react";

import { StayClient } from "../src/clients/stayClient";
import Directory from "../src/components/Directory/Directory";
import Footer from "../src/components/Footer";
import { Stay } from "../src/models";
import StaysPage from "../src/StaysPage";

const DirectoryPage: NextPage = (props: any) => {
  return (
    <StaysPage>
      <Directory stays={props.stays} />
      <Footer />
    </StaysPage>
  );
};

// export async function getStaticProps() {
//   const client = new StayClient();
//   const stays = await client.getStays("", { enable: true }, { lastEvaluatedKey: 0, count: 10 });
//   return {
//     props: {
//       stays
//     },
//     revalidate: 100
//   };
// }

export default DirectoryPage;
