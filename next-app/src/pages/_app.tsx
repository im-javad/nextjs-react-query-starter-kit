import queryClient from "@/utils/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AppProps } from "next/app";
import * as React from "react";
import "@/styles/globals.css";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default MyApp;
