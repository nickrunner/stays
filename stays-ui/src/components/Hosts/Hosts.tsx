import { Box, Typography } from "@mui/material";
import React from "react";

import { Nav } from "../AppBar/AppBar";
import DetailsAccordion from "../general/DetailsAccordion";
import Info from "../general/Info";
import Section from "../general/Section";
import SectionDivider from "../general/SectionDivider";
import SectionHead from "../general/SectionHead";

export default function Hosts(props: any) {
  return (
    <Box sx={{ maxWidth: "lg", margin: "auto", mt: 15 }}>
      <Nav transparent={false} />
      <Box sx={{ display: "grid" }}>
        <Section>
          <Box sx={{ display: "grid" }}>
            <SectionHead>Why Join Stays?</SectionHead>

            <Info
              title="Stand out from the crowd"
              body="If you utilize platforms like Airbnb/VRBO it can be difficult to separate your rental from the rest. Especially as the market has gotten more and more saturated, Stays helps your ideal guests find you and not get lost in their search for places like yours."></Info>
            <Info
              title="Source more direct bookings"
              body="If you have a private booking site and don’t use a booking platform like Airbnb, stays can help you get found. Why rely on Airbnb/VRBO with crazy service fees to source bookings? Stays will help plug your direct booking website so you can keep more of the income you earn!"></Info>
            <Info
              title="Build a brand"
              body="When you partner with Stays, we use our large platform to showcase your rental to our massive online audience. More exposure means more brand recognition and therefore more opportunities to develop/scale your brand and business."></Info>
            <Info
              title="Grow a loyal audience"
              body="Stays owns and operates a social media network amassing over 1 million users. Unlike booking platforms who want to control the communication between hosts and guests, Stays wants to help your rental/brand engage with users and be able to grow its social media pages and audience."></Info>
            <Info
              title="Generate more income"
              body="Whether you’re using Airbnb/VRBO or a private booking platform, more traffic, more marketing, more social media followers, more bookings, etc. all result in one thing—more earned income for you and your business."></Info>
          </Box>
        </Section>
        <SectionDivider />
        <Section>
          <Box sx={{ display: "grid", gap: 3 }}>
            <SectionHead>Frequently Asked Questions</SectionHead>

            <DetailsAccordion header="Does it cost to be listed on Stays?">
              <Typography variant="body1">
                {`Unlike other platforms (Airbnb, VRBO, etc.) that take a 10-20% booking commission,
                your listing with Stays is totally commission-free!If you're approved for listing,
                we charge an annual fee that ranges from $299-899/year, depending on the membership
                plan you choose.This annual fee covers listing services, paid marketing campaigns to
                drive traffic to Stays (and thus your listing), a package of social media
                promotions, email marketing, preferred referrals and all the other perks of joining
                our Stays community.`}
              </Typography>
            </DetailsAccordion>
            <DetailsAccordion header="What's the criteria to get my rental listed?">
              <Typography variant="body1">
                {`Stays takes pride in being a trusted, curated source for the best vacation rentals
                for our community members. To ensure we are able to do this, we only work with stays
                that can offer a unique and memorable experience for guests.Stays with great
                location, excellent views, rare amenities, aesthetic interiors, unique design and
                superb service will be prioritized to work with us. With all that being said, there
                is no "written in stone" criteria. It depends on the stay! So, if you're interested
                in getting your rental listed, please submit a free application found below on this
                page.`}
              </Typography>
            </DetailsAccordion>
            <DetailsAccordion header="Does Stays manage bookings for my rental?">
              <Typography variant="body1">
                {`No, Stays does not receive or process bookings. Stays is a directory and marketing
                service, not a booking platform.`}
              </Typography>
              <Typography variant="body1">
                {`Your listing here on Stays will direct interested renters to your existing booking
                website or webpage.`}
              </Typography>
              <Typography variant="body1">
                {`We'd suggest that we refer them to your rental's private booking website (so you
                keep more of your money and avoid the service fees on other platforms), but we can
                also direct them to your Airbnb/VRBO listing if that's what you'd prefer.`}
              </Typography>
            </DetailsAccordion>
            <DetailsAccordion header="What makes Stays so special?">
              <Typography variant="body1">
                {`The Stays team has spent years developing an organically-grown social media network
                of 'Stays' branded accounts with audiences of real, potential bookers. We are now
                able to use our online platform to help connect eager bookers with our amazing
                rental partners.And the power of Stays expands beyond just the branded accounts.
                Stays is a subsidiary of Greater Wave--a large media group that owns/operates large,
                high-quality digital assets from all around the world.What does this mean for our
                rental partners? It means we are able to leverage group resources and sophistication
                to amplify the marketing efforts and promotional services executed on behalf of your
                rental.`}
              </Typography>
            </DetailsAccordion>
            <DetailsAccordion header="My rental has potential, but isn't Stays ready yet. Can you help?">
              <Typography variant="body1">
                {`Yes! There are so many wonderful rentals out there that are not living up to their
                potential due to a lack of top-tier digital content, marketing and branding
                efforts.Luckily, Stays offers a solution. We work with an in-house media/marketing
                partner, as well as some of the best short-term rental content creators available,
                to help rentals become iconic destinations with a large and loyal audience of
                potential bookers!Navigate to the 'Contact' page on this website and reach out if
                you're interested in learning more or getting started.`}
              </Typography>
            </DetailsAccordion>
          </Box>
        </Section>
        <SectionDivider />
      </Box>
    </Box>
  );
}
