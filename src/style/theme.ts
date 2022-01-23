import { extendTheme, theme as ChakraTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    white: "white",
    green: {
      300: "#93D7AF",
      500: "#27AE60",
      700: "#168821",
    },
    red: {
      500: "#EB5757",
      700: "#E60000",
    },
    gray: {
      0: "#F5F5F5",
      6: "#F2F2F2",
      10: "#BDBDBD",
      50: "#999999",
      100: "#E0E0E0",
      300: "#828282",
      600: "#333333",
    },
    yellow: {
      500: "#FFCD07",
    },
    blue: {
      500: "#155BCB",
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.375rem",
    "2xl": "1.625rem",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "gray.600",
      },
    },
  },
});
