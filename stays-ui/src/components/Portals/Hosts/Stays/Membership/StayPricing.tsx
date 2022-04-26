import Check from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

const tiers = [
  {
    title: "Bronze",
    price: "299",
    subheader: "Starter",
    description: [
      "Custom listing on Stays directory",
      "Direct referrals, 0% commissions",
      "Promotion: 1 featured Instagram FEED post on American Stays",
      "Promotion 1 featured Instagram FEED post on the proper regional account (e.g. North Stays, Southwest Stays, etc.)",
      "Promotion: 1 featured Instagram STORY post (2-3 slides)",
      'Promotion: addition into the American Stays regional "story highlights" on Instagram (based on stay’s location)',
      "Access to our partnered influencer/creator list for promotion/service trades for free or discounted stays at your rental",
      "1 cancellation opening Email and Instagram STORY post",
      "5% discount on additional a la carte promotional services with Stays"
    ],
    buttonText: "Select Bronze",
    buttonVariant: "outlined",
    route: "sign-up"
  },
  {
    title: "Silver",
    price: "499",
    subheader: "Boosted",
    description: [
      "Custom listing on Stays directory",
      "Direct referrals, 0% commissions",
      "Promotion: showcase email to Stays members",
      "*Promotion: 2 featured Instagram FEED post on American Stays",
      "Promotion 1 featured Instagram FEED post on the proper regional account (e.g. North Stays, Southwest Stays, etc.)",
      "*Promotion: 3 featured Instagram STORY posts (2-3 slides)",
      'Promotion: addition into the American Stays regional "story highlights" on Instagram (based on stay’s location)',
      "*Giveaway: 1 giveaway campaign to grow your social media audience",
      "Access to our partnered influencer/creator list for promotion/service trades for free or discounted stays at your rental",
      "2 cancellation opening Email and Instagram STORY post",
      "10% discount on additional a la carte promotional services with Stays"
    ],
    buttonText: "Select Silver",
    buttonVariant: "contained",
    route: "sign-up/premium"
  },
  {
    title: "Gold",
    price: "799",
    subheader: "High Visibility",
    description: [
      "Custom listing on Stays directory",
      "Direct referrals, 0% commissions",
      "Promotion: showcase email to Stays members",
      "*Promotion: 3 featured Instagram FEED post on American Stays",
      "Promotion 2 featured Instagram FEED post on the proper regional account (e.g. North Stays, Southwest Stays, etc.)",
      "*Promotion: 5 featured Instagram STORY posts (2-3 slides)",
      'Promotion: addition into the American Stays regional "story highlights" on Instagram (based on stay’s location)',
      "*Giveaway: 1 giveaway campaign to grow your social media audience",
      "Access to our partnered influencer/creator list for promotion/service trades for free or discounted stays at your rental",
      "3 cancellation opening Email and Instagram STORY post",
      "15% discount on additional a la carte promotional services with Stays",
      "Added into the “Top Picks” section of website"
    ],
    buttonText: "Select Gold",
    buttonVariant: "contained",
    route: "sign-up/premium"
  },
  {
    title: "Platinum",
    price: "1299",
    subheader: "Max Visibility",
    description: [
      "Custom listing on Stays directory",
      "Direct referrals, 0% commissions",
      "Promotion: showcase email to Stays members",
      "*Promotion: 3 featured Instagram FEED post on American Stays",
      "Promotion 2 featured Instagram FEED post on the proper regional account (e.g. North Stays, Southwest Stays, etc.)",
      "*Promotion: 5 featured Instagram STORY posts (2-3 slides)",
      'Promotion: addition into the American Stays regional "story highlights" on Instagram (based on stay’s location)',
      "*Giveaway: 1 giveaway campaign to grow your social media audience",
      "Access to our partnered influencer/creator list for promotion/service trades for free or discounted stays at your rental",
      "3 cancellation opening Email and Instagram STORY post",
      "15% discount on additional a la carte promotional services with Stays",
      "Added into the “Top Picks” section of website",
      "Blog post written about your stay and shared across our network",
      "Paid Google ads ran on behalf of YOUR stay (you determine the ad spend budget)"
    ],
    buttonText: "Select Platinum",
    buttonVariant: "contained",
    route: "sign-up/premium"
  }
];

function PricingContent() {
  return (
    <Box sx={{ display: "grid", justifyContent: "center" }}>
      <Box maxWidth="lg" sx={{ pt: 8, pb: 6 }}>
        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
          Choose your Membership
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Client membership options include listing on the website, property showcases, and varying
          levels of marketing support and promotion on social media.
        </Typography>
      </Box>

      <Box maxWidth="lg" sx={{ justifyContent: "center", align: "center", margin: "auto" }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={15} sm={6} md={3}>
              <Card sx={{ height: 1200 }}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={
                    tier.title === "Premium" ? <StarIcon sx={{ color: "primary.main" }} /> : null
                  }
                  subheaderTypographyProps={{
                    align: "center"
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700]
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2
                    }}>
                    <Typography variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /yr
                    </Typography>
                  </Box>
                  <Box sx={{ height: 800 }}>
                    {tier.description.map((line) => (
                      <Box key={line} sx={{ display: "flex" }}>
                        <Check sx={{ mr: 0.5, mt: 1.5, fontSize: "small" }} color="secondary" />
                        <Typography variant="caption" align="left" sx={{ p: 0.5 }} key={line}>
                          {line}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Link href={"/" + tier.route}>
                    <Button fullWidth variant={tier.buttonVariant as "outlined" | "contained"}>
                      {tier.buttonText}
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default function StayPricing() {
  return <PricingContent />;
}
