import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Container } from '@smartive-education/design-system-component-library-musketeers';

type Props = {
  profile: {
    alias: string;
  };
};

export default function ProfilePage({ profile }: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  return (
    <>
      <Head>
        <title>Profile | {profile.alias}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1 className="heading-1 mt-xl">Profile page</h1>
        <h3>{profile.alias}</h3>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query: { alias } }) => {
  return {
    props: {
      profile: { alias },
    },
  };
};
