import Head from 'next/head';
import { Container } from '@smartive-education/design-system-component-library-musketeers';

function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
      </Head>
      <Container>
        <h1>Sorry the page you are looking does not exist</h1>
      </Container>
    </>
  );
}
export default NotFound;
