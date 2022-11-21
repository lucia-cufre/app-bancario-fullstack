import { createTheme } from "@mui/material";
import { primaryColor, secondaryColor } from "./colors";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
      contrastText: "black",
    },

    secondary: {
      main: secondaryColor,
    },
  },
});

export default theme;