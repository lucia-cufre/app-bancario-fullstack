import Router from "./Router/router";
import { GlobalStyle } from "./AppStyles";
import theme from "./Constants/theme";
import { ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
