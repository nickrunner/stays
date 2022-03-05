import { Box } from "@mui/material";

import styles from "../../../styles/ComingSoon.module.css";
import { content } from "../../content";
import EmphasizedText from "../EmphasizedText";
import SectionHead from "../general/SectionHead";
import SectionSub from "../general/SectionSub";

export default function SocialProof() {
  return (
    <Box sx={{ display: "grid", gap: 10, justifyContent: "center" }}>
      <SectionHead>
        <EmphasizedText
          fullText={content.pages.comingSoon.socialProof.header}
          emphasis="1 million"
          class={styles.empMain}
        />
      </SectionHead>

      <SectionSub>{content.pages.comingSoon.socialProof.sub}</SectionSub>
    </Box>
  );
}
