import { Divider } from "@mui/material";

export default function SectionDivider() {
  return (
    // <Box
    //   sx={{
    //     position: "relative",
    //     width: { xs: "75%", sm: "50%" },
    //     height: 40,
    //     justifyContent: "center",
    //     margin: "auto"
    //   }}>
    //   <Image src={content.images.sectionDivider} layout="fill" alt="Section Divider" />
    // </Box>

    <Divider sx={{ borderBottom: 2 }} />
  );
}
