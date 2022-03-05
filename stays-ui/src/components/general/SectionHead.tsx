import { Typography } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SectionHead(props: any) {
  return (
    <Typography
      variant="h2"
      align="center"
      color="text.primary"
      sx={{
        align: { xs: "center", sm: "left" }
      }}>
      {props.children}
    </Typography>
  );
}
