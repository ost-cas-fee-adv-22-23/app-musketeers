import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Container } from '@smartive-education/design-system-component-library-musketeers';

type Props = {
  profile: {
    alias: string;
  };
};

export default function ProfilePage({ profile }: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const title = `Profile | ${profile.alias}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Container>
        <h1 className="heading-2">Profile page</h1>
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
