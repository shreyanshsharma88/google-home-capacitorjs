import { createTheme } from "@mui/material";

export const customTheme = () => {
  return createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#8ab4f8",
      },
      secondary: {
        main: "#f28b82",
      },
      background: {
        default: "#202124",
        paper: "#303134",
      },
      text: {
        primary: "#e8eaed",
        secondary: "#9aa0a6",
      },
    },
    typography: {
      fontFamily: '"Google Sans", "Roboto", "Arial", sans-serif',
      h1: {
        fontWeight: 400,
      },
      h2: {
        fontWeight: 400,
      },
      h3: {
        fontWeight: 400,
      },
      h4: {
        fontWeight: 400,
      },
      h5: {
        fontWeight: 400,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            textTransform: "none",
            padding: "8px 16px",
          },
          containedPrimary: {
            backgroundColor: "#303134",
            color: "#e8eaed",
            "&:hover": {
              backgroundColor: "#3c4043",
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            fontSize: "20px",
            color: "#fff",
            backgroundColor: "#77919D",
            fontWeight: "700",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#303134",
            borderRadius: 16,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 30,
              backgroundColor: "rgba(255, 255, 255, 0.06)",
              border: "none",
            },
            "& .MuiOutlinedInput-notchedOutline ": {
              border: "none",
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            "&::placeholder": {
              color: "#9aa0a6",
              opacity: 1,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#202124",
            boxShadow: "none",
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          slotProps: {
            paper: {
              sx: {
                padding: 2,
                backgroundColor: "#2f3034",
                margin: "20px",
                height: "87vh",
                alignSelf: "end",
                borderRadius: "11px",
                width: "100%",
              },
            },
          },
        },
      },
    },
  });
};
