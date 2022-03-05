import { Typography } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SectionSub(props: any) {
  return (
    <Typography variant="h5" align="left" color="common.black">
      {props.children}
    </Typography>
  );
}
