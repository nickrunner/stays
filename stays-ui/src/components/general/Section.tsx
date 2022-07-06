import { Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Section(props: any) {
  return (
    <section>
      <Box sx={props.sx}>
        {/* <Image
          className={styles.BackgroundImage}
          layout="fill"
          src={props.backgroundImage ? props.backgroundImage : "/"}
          alt="SectionImage"></Image> */}
        <Box
          sx={{
            p: "5%",
            mb: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
          {props.children}
        </Box>
      </Box>
    </section>
  );
}
