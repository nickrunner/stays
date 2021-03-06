import { Box, Container } from "@mui/material";

import CmsFrame from "../../../src/components/CmsFrame";
import AddStay from "../../../src/components/Stay/AddStay";
import { StayContext } from "../../../src/components/Stay/StayContext";
import StaysPage from "../../../src/StaysPage";

export default function AddStaysCms() {
  return (
    <StaysPage>
      <Box sx={{ display: "flex" }}>
        <CmsFrame />
        <Container maxWidth="xl" sx={{ mt: 8, mb: 4 }}>
          <StayContext>
            <AddStay />
          </StayContext>
        </Container>
      </Box>
    </StaysPage>
  );
}
