import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";


function Stayers() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >

      </Container>
    </ThemeProvider>
  );
}

export default Stayers;
