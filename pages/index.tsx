import Head from 'next/head';
import { Container } from '@smartive-education/design-system-component-library-musketeers';
import Mumble from '../components/mumble';
import MumbleAdd from '../components/mumble-add';

export default function PageHome() {
  return (
    <>
      <Head>
        <title>Willkommen auf Mumble</title>
      </Head>

      <Container>
        <h1 className="heading-2 text-violet-600 mb-xs">Willkommen auf Mumble</h1>
        <h2 className="heading-4 text-slate-500 mb-m">
          Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.
        </h2>
        <div className="mb-s">
          <MumbleAdd />
        </div>
        <div>
          <Mumble />
        </div>
      </Container>
    </>
  );
}
