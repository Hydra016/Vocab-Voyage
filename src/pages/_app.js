import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import QuestionProvider from "@/context/QuestionProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter()

  // useEffect(() => {
  //   console.log(router.pathname)
  // },[router.pathname])

  return (
    <QuestionProvider>
      <ChakraProvider>
        <div className="App">
          {" "}
          <Head>
            <title>Vocab Voyage</title>
            <meta name="description" content="Basic Bonjour" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/paris.png" />
          </Head>
          <Component {...pageProps} />
        </div>
      </ChakraProvider>
    </QuestionProvider>
  );
}
