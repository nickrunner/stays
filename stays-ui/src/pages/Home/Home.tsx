import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../../Theme";


function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >

      </Container>
    </ThemeProvider>
  );
}

export default Home;
