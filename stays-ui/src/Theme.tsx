import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1920
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: {
          textTransform: "none"
        },
        sizeSmall: {
          padding: "6px 16px"
        },
        sizeMedium: {
          padding: "8px 20px"
        },
        sizeLarge: {
          padding: "15px 30px"
        },
        textSizeSmall: {
          padding: "7px 12px"
        },
        textSizeMedium: {
          padding: "11px 20px"
        },
        textSizeLarge: {
          padding: "15px 20px"
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px"
          }
        }
      }
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6"
        },
        subheaderTypographyProps: {
          variant: "body2"
        }
      },
      styleOverrides: {
        root: {
          padding: "32px 24px"
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%"
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%"
        },
        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#b6b3bd"
        }
      }
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F4F6",
          ".MuiTableCell-root": {
            color: "#b6b3bd"
          },
          borderBottom: "none",
          "& .MuiTableCell-root": {
            borderBottom: "none",
            fontSize: "12px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: "uppercase"
          },
          "& .MuiTableCell-paddingCheckbox": {
            paddingTop: 4,
            paddingBottom: 4
          }
        }
      }
    }
  },

  palette: {
    action: {
      active: "#6B7280",
      focus: "rgba(55, 65, 81, 0.7)",
      hover: "#d5d8de",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)"
    },
    background: {
      default: "#F9FAFC",
      //default: '#FFF6EB',
      //default: "#edebd3",
      paper: "#FFFFFF"
    },
    divider: "#E6E8F0",
    primary: {
      main: "#6c5ee6",
      //main: "#4103fc",
      light: "#FFFFFF",
      dark: "#0E0C1D",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#3FC79A",
      light: "#3FC79A",
      dark: "#0B815A",
      contrastText: "#FFFFFF"
    },
    success: {
      main: "#14B8A6",
      light: "#43C6B7",
      dark: "#0E8074",
      contrastText: "#FFFFFF"
    },
    info: {
      main: "#2196F3",
      light: "#64B6F7",
      dark: "#0B79D0",
      contrastText: "#FFFFFF"
    },
    warning: {
      main: "#FFB020",
      light: "#FFBF4C",
      dark: "#B27B16",
      contrastText: "#FFFFFF"
    },
    error: {
      main: "#D14343",
      light: "#DA6868",
      dark: "#922E2E",
      contrastText: "#FFFFFF"
    },
    text: {
      primary: "#121828",
      secondary: "#65748B",
      disabled: "rgba(55, 65, 81, 0.48)"
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)"
  ],
  typography: {
    button: {
      fontWeight: 600,
      textTransform: "none"
    },
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.57
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 700,
      "@media (min-width:400px)": {
        fontSize: "0.5rem"
      },
      "@media (min-width:500px)": {
        fontSize: "0.55rem"
      },
      "@media (min-width:700px)": {
        fontSize: "0.6rem"
      },
      "@media (min-width:800px)": {
        fontSize: "0.65rem"
      },
      "@media (min-width:900px)": {
        fontSize: "0.7rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "0.75rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "0.8rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "1.0rem"
      },
      lineHeight: 1.5
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      lineHeight: 1.57
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: "0.5px",
      lineHeight: 1.5,
      textTransform: "uppercase"
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      lineHeight: 1.66
    },
    h1: {
      fontWeight: 900,
      fontSize: "2rem",
      "@media (min-width:400px)": {
        fontSize: "2.25rem"
      },
      "@media (min-width:500px)": {
        fontSize: "2.4rem"
      },
      "@media (min-width:700px)": {
        fontSize: "2.5rem"
      },
      "@media (min-width:800px)": {
        fontSize: "2.6rem"
      },
      "@media (min-width:900px)": {
        fontSize: "2.75rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "3rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "3.25rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "3.5rem"
      },
      lineHeight: 1.375
    },
    h2: {
      fontWeight: 900,
      fontSize: "2rem",
      lineHeight: 1.375,
      "@media (min-width:400px)": {
        fontSize: "2.2rem"
      },
      "@media (min-width:500px)": {
        fontSize: "2.25rem"
      },
      "@media (min-width:600px)": {
        fontSize: "2.3rem"
      },
      "@media (min-width:700px)": {
        fontSize: "2.4rem"
      },
      "@media (min-width:800px)": {
        fontSize: "2.5rem"
      },
      "@media (min-width:900px)": {
        fontSize: "2.6rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "2.75rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "2.9rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "3rem"
      }
    },
    h3: {
      fontWeight: 800,
      fontSize: "1.5rem",
      lineHeight: 1.375,
      "@media (min-width:400px)": {
        fontSize: "1.5rem"
      },
      "@media (min-width:500px)": {
        fontSize: "1.6rem"
      },
      "@media (min-width:600px)": {
        fontSize: "1.7rem"
      },
      "@media (min-width:700px)": {
        fontSize: "1.8rem"
      },
      "@media (min-width:800px)": {
        fontSize: "2rem"
      },
      "@media (min-width:900px)": {
        fontSize: "2.1rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "2.25rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "2.4rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "2.5rem"
      }
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.2rem",
      lineHeight: 1.375,
      "@media (min-width:400px)": {
        fontSize: "1.2rem"
      },
      "@media (min-width:500px)": {
        fontSize: "1.2rem"
      },
      "@media (min-width:600px)": {
        fontSize: "1.3rem"
      },
      "@media (min-width:700px)": {
        fontSize: "1.5rem"
      },
      "@media (min-width:800px)": {
        fontSize: "1.75rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "1.875rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "2rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "2.25frem"
      }
    },
    h5: {
      fontWeight: 700,
      fontSize: "1.2rem",
      lineHeight: 1.375,
      "@media (min-width:400px)": {
        fontSize: "1.2rem"
      },
      "@media (min-width:500px)": {
        fontSize: "1.2rem"
      },
      "@media (min-width:600px)": {
        fontSize: "1.2rem"
      },
      "@media (min-width:700px)": {
        fontSize: "1.3rem"
      },
      "@media (min-width:800px)": {
        fontSize: "1.4rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "1.5rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "1.6rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "1.7rem"
      }
    },
    h6: {
      fontWeight: 700,
      fontSize: "1.3rem",
      lineHeight: 1.375,
      "@media (min-width:400px)": {
        fontSize: "1.3rem"
      },
      "@media (min-width:500px)": {
        fontSize: "1.3rem"
      },
      "@media (min-width:600px)": {
        fontSize: "1.3rem"
      },
      "@media (min-width:700px)": {
        fontSize: "1.4rem"
      },
      "@media (min-width:lg)": {
        fontSize: "1.4rem"
      },
      "@media (min-width:1000px)": {
        fontSize: "1.4rem"
      },
      "@media (min-width:1100px)": {
        fontSize: "1.4rem"
      },
      "@media (min-width:1200px)": {
        fontSize: "1.5rem"
      }
    }
  }
});
