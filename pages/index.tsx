import Head from 'next/head';
import { Container } from '@smartive-education/design-system-component-library-musketeers';
import Toggle from '../components/toggle';

export default function PageHome() {
  return (
    <>
      <Head>
        <title>Index</title>
      </Head>

      <Container>
        <h1 className="heading-1 mt-xl">Index page</h1>
        <Toggle />
      </Container>
    </>
  );
}
