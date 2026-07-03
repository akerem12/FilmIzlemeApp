import { createTheme } from "@mui/material/styles";

// Koyu sinema teması: gece mavisi zemin + altın/amber vurgu
export const GOLD = "#f5c518";
export const GOLD_DARK = "#d4a90f";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: GOLD, dark: GOLD_DARK, contrastText: "#141414" },
    secondary: { main: "#8b9bb4" },
    background: {
      default: "#0b0f19",
      paper: "#121826",
    },
    text: {
      primary: "#e8eaf0",
      secondary: "#9aa4b8",
    },
    warning: { main: GOLD },
    divider: "rgba(255,255,255,0.08)",
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    h4: { fontWeight: 800, letterSpacing: "-0.5px" },
    h5: { fontWeight: 700, letterSpacing: "-0.3px" },
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.06)",
          transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 10 },
        contained: {
          boxShadow: "0 4px 14px rgba(245,197,24,0.25)",
          "&:hover": { boxShadow: "0 6px 20px rgba(245,197,24,0.35)" },
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined" },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: "rgba(255,255,255,0.03)",
          "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.12)" },
          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(245,197,24,0.4)" },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 700 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: "none",
          border: "1px solid rgba(255,255,255,0.08)",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },
});

export default theme;
