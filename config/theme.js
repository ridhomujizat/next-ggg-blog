import {
    extendTheme,
    ColorMode,
    ChakraTheme,
    ThemeComponentProps,
  } from "@chakra-ui/react";
  import { mode } from "@chakra-ui/theme-tools";
  
  export const ThemeMode = {
    Light: 'light',
    Dark: 'dark',
  }
  
  export const mobileBreakpointsMap = {
    base: true,
    md: true,
    lg: true,
    xl: false,
  };
  
  const styles = {
    global: (props) => ({
      body: {
        color: mode("whiteAlpha.900", "whiteAlpha.900")(props),
        bg: mode("#0C0E17", "#0C0E17")(props),
      },
    }),
  };
  
  const textVariants = {
    emphasis: (props) => ({
      color: mode("teal.500", "cyan.200")(props),
    }),
    description: (props) => ({
      color: mode("gray.800", "gray.400")(props),
    }),
    accent: (props) => ({
      color: mode("black.400", "cyan.200")(props),
    }),
    accentAlternative: (props) => ({
      color: mode("#595959", "#A6A6A6")(props),
    }),
  };
  
  const config = {
    initialColorMode: ThemeMode.Dark,
    useSystemColorMode: true,
  }
  
  const colors = {
    black: "#121212",
    blueDark: "#1C2975"
  };
  
  const theme = extendTheme({
    config,
    fonts: {
      body: "Poppins",
    },
    colors,
    styles,
    components: {
      Text: {
        variants: textVariants,
      },
    },
  });
  
  export default theme