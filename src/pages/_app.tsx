import React, { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "@styles/globals.css";
import { Fonts, Theme, Client } from "@constants";
// import { DescContext } from "contexts/DescriptionContext";
import { ApolloProvider } from "@apollo/react-hooks";

function MyApp({ Component, pageProps }: AppProps) {
  const [descCon, setDescCon] = React.useState("");
  //If Error in Client , Make a new var with function Client()
  return (
    <ChakraProvider resetCSS={true} theme={Theme}>
      <ApolloProvider client={Client}>
        {/* <DescContext.Provider value={{ descCon, setDescCon }}> */}
          <Fonts />
          <Component {...pageProps} />
        {/* </DescContext.Provider> */}
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default MyApp;
