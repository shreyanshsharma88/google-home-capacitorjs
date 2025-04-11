import { CssBaseline, ThemeProvider } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { customTheme } from "../theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const theme = customTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          theme="dark"
        />
        {children}
      </CssBaseline>
    </ThemeProvider>
  );
};
