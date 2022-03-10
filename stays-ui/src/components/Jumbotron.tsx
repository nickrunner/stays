import { Box } from "@mui/material";

import styles from "../../styles/Hero.module.css";

export default function Jumbotron(props: any) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        bgcolor: "primary.dark",
        zIndex: -1,
        justifyContent: "center"
      }}>
      <img
        alt="hero"
        className={styles.HeroImage}
        src={props.backgroundImage}
        width="100%"
        height="100%"
      />
    </Box>
  );
}
