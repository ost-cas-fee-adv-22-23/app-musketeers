import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import NextNProgress from 'nextjs-progressbar';
import '../styles/globals.css';
import Layout from '../components/layout';
import { UserModel } from '../models/user.model';
import Head from 'next/head';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export const userCache: { [key: string]: UserModel } = {};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
        <meta name="theme-color" content="#fff" />
        <meta name="description" content="Let's get ready to Mumble!"></meta>
      </Head>

      <NextNProgress color="#C4B5FD" options={{ showSpinner: false }} />
      <SessionProvider session={session}>
        <ToastContainer position={'top-center'} theme="colored" autoClose={2000} closeOnClick />
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
    </>
  );
}
