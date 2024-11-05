import type { AppProps } from "next/app";

import { ThemeProvider } from "styled-components";
import { MantineProvider } from "@mantine/core";

import { configTheme, theme } from "@/utils/ThemeConfig";

import NextNProgress from "nextjs-progressbar";

import { ToastContainer } from "react-toastify";

import { Hydrate, QueryClientProvider, queryClient } from "../libs/ReactQuery";

import { AuthProvider } from "../libs/Auth";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";
import "../styles/select.css";
import "../styles/override.toast.css";

import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import AppLayoutActive from "@/layouts/AppLayoutActive";
import "../../dayjs.config";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) => {
  const getLayout = Component?.getLayout ?? ((page) => page);
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <NextNProgress color="#ED6203" />
          <ToastContainer limit={3} style={{ width: 600 }} />
          <AuthProvider>
            
              <MantineProvider withCssVariables theme={configTheme}>
                <AppRouterCacheProvider>
                  <Component {...pageProps} />;
                </AppRouterCacheProvider>
              </MantineProvider>
            
            {/* <ReactQueryDevtools initialIsOpen /> */}
          </AuthProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
