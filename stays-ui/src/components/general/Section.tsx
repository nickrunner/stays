import { Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Section(props: any) {
  return (
    <section>
      <Box
        sx={{
          maxWidth: "lg",
          p: "10%",
          mb: 10,
          display: "flex",
          justifyContent: "center"
        }}>
        {props.children}
      </Box>
    </section>
  );
}
