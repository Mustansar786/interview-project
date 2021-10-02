import Routes from "./Routes/Routes";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { createMuiTheme, Slide, ThemeProvider } from "@material-ui/core";
import { color_palette } from "./theme/theme";
import { SnackbarProvider } from "notistack";
import "font-awesome/css/font-awesome.min.css";
import "./App.css";
function App() {
  const browserHistory = createBrowserHistory();
  const theme = createMuiTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: color_palette.primary,
      },
      secondary: {
        main: color_palette.secondary,
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            TransitionComponent={Slide}
            maxSnack={3}
          >
            <Routes />
          </SnackbarProvider>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
