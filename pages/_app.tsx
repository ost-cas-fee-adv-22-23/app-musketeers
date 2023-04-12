import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import NextNProgress from 'nextjs-progressbar';

import '../styles/globals.css';

import Layout from '../components/layout';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <NextNProgress color="#C4B5FD" />
      <SessionProvider session={session}>
        <ToastContainer position={'top-center'} theme="light" autoClose={2000} closeOnClick />
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </>
  );
}
