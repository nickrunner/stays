import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import React from "react";

import { content } from "../../content";
import { globalContext } from "../../GlobalStore";
import { Nav } from "../AppBar/AppBar";
import Footer from "../Footer";
import Hero from "../general/Hero";
import Section from "../general/Section";
import SectionDivider from "../general/SectionDivider";
import Description from "./Description";
import Help from "./Help";
import Showcase from "./Showcase";

export default function Home(props: any) {
  const { globalState } = React.useContext(globalContext);
  const router = useRouter();

  React.useEffect(() => {
    if (globalState.isSignedIn) {
      if (globalState.self) {
        router.push("/travelers/" + globalState.self?.id);
      }
    }
    return;
  }, []);

  return (
    <Box display="grid">
      <Nav transparent={true} />

      <Hero
        height={600}
        heading="Stay in Luxury. Save Money"
        description="Book Directly with the Worlds Best Vacation Rentals"
        buttonText="Find Your Stay"
        image={content.images.hero.woodhouse.img}
        blur={content.images.hero.woodhouse.blur}
        onButtonClick={() => router.push("/directory")}
      />

      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 600
        }}>
        <Section
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundImage: `url(${content.images.dotMap})`
          }}>
          <Description />
        </Section>
        <SectionDivider />
        <Section
          sx={{
            justifyContent: "center"
          }}>
          <Showcase />
        </Section>
        <Section
          sx={{
            display: "flex",
            justifyContent: "center"
          }}>
          <Help />
        </Section>
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
