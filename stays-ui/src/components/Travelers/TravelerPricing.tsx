import Check from "@mui/icons-material/Check";
import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import * as React from "react";

const tiers = [
  {
    title: "Standard",
    price: "0",
    subheader: "For any vacation stay enthusiast who wants to stay in the loop",
    description: [
      "Access to Stays directory",
      "Property showcases via email",
      "Cancellation opening notices",
      "1 auto entry into all Stays Giveaways"
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    route: "sign-up"
  },
  {
    title: "Premium",
    price: "7",
    subheader: "For those who travel often and are passionate about where they stay",
    description: [
      "Access to Stays directory",
      "Property showcases via email",
      "Cancellation opening notices",
      "5 auto entries into all Stays Giveaways",
      "Early booking access (for select stays)",
      "Discount & deal notices (for select stays)"
    ],
    buttonText: "Join Now",
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
          Get early access to booking calendars, cancellation opening notices and select discounts
          with our partnered stays with a premium membership
        </Typography>
      </Box>

      <Box maxWidth="md" sx={{ justifyContent: "center", align: "center", margin: "auto" }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.title} xs={15} sm={10} md={6}>
              <Card sx={{ height: 650 }}>
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
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <Box sx={{ height: 250 }}>
                    {tier.description.map((line) => (
                      <Box key={line} sx={{ display: "flex" }}>
                        <Check sx={{ mr: 2, mt: 0.5 }} color="secondary" />
                        <Typography variant="subtitle1" align="left" sx={{ p: 1 }} key={line}>
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

export default function Pricing() {
  return <PricingContent />;
}
