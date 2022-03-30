import { Typography } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SectionSub(props: any) {
  return (
    <Typography variant="h3" align="left" color="primary.dark">
      {props.children}
    </Typography>
  );
}
