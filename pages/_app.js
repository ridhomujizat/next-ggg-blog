// import "jodit/build/jodit.min.css";
import "styles/editor.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "config/theme";

function MyApp({ Component, pageProps }) {
  return (  
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
