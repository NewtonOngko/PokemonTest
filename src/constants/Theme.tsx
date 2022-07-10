import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  fonts: {
    heading: "Mulish",
    body: "Mulish",
    mono: "Mulish",
  },
});

export default Theme;
