import { Box } from "@mui/material";
import Image from "next/image";

import { content } from "../../content";

export default function SectionDivider(props: any) {
  return (
    <Box
      sx={{
        position: "relative",
        width: { xs: "75%", sm: "50%" },
        height: 40,
        justifyContent: "center",
        margin: "auto"
      }}>
      <Image src={content.images.sectionDivider} layout="fill" alt="Section Divider" />
    </Box>
  );
}
