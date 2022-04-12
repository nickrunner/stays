import React from "react";

import { Nav } from "../AppBar/AppBar";
import Section from "../general/Section";
import TravelerPricing from "./TravelerPricing";

export default function Travelers(props: any) {
  return (
    <React.Fragment>
      <Nav transparent={false} />
      <Section>
        <TravelerPricing />
      </Section>
    </React.Fragment>
  );
}
