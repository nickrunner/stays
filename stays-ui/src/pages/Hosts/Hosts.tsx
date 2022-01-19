import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";


function Hosts() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >

      </Container>
    </ThemeProvider>
  );
}

export default Hosts;
