import { Container, Grid, Link, Typography } from "@mui/material";

import Copyright from "./Copyright";

export default function Footer() {
  const footers = [
    {
      title: "Stays",
      description: ["Team", "History", "Contact us", "Locations"]
    },
    {
      title: "Features",
      description: [
        "Cool stuff",
        "Random feature",
        "Team feature",
        "Developer stuff",
        "Another one"
      ]
    },
    {
      title: "Resources",
      description: ["Resource", "Resource name", "Another resource", "Final resource"]
    },
    {
      title: "Legal",
      description: ["Privacy policy", "Terms of use"]
    }
  ];

  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme: { palette: { divider: any } }) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6]
      }}>
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers.map((footer) => (
          <Grid item xs={6} sm={3} key={footer.title}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              {footer.title}
            </Typography>
            <ul>
              {footer.description.map((item) => (
                <li key={item}>
                  <Link href="/" variant="subtitle1" color="text.secondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
        ))}
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
