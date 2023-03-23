import Head from 'next/head';
import Image from 'next/image';
import { Container, Avatar, AvatarSize } from '@smartive-education/design-system-component-library-musketeers';
import MumbleAdd from '../components/mumble-add';
import Timeline from '../components/timeline';
import { getSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { qwackerRequest } from '../services/qwacker.service';
import { QJWT } from './api/auth/[...nextauth]';
import { QwackModel } from '../models/qwacker.model';
import { Session } from 'next-auth';

interface PageHomeProps {
  session: Session;
  posts: QwackModel[];
}

export default function PageHome(props: PageHomeProps) {
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
          <MumbleAdd
            title={'Hey, was gibt’s neues?'}
            avatar={
              <Avatar
                alt="Display Name @displayName"
                showBorder
                size={AvatarSize.M}
                imageElementType={Image}
                imageComponentProps={{ width: '480', height: '480' }}
                src="https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg"
              />
            }
            onImageUpload={() => console.log('onImageUpload')}
            onSend={() => console.log('onSend')}
          />
        </div>
        <Timeline posts={props.posts} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const token = (await getToken(ctx)) as QJWT;
  let posts: QwackModel[] = [];

  if (token) {
    const { data } = await qwackerRequest('posts', token.accessToken, { method: 'GET' });
    posts = data;
  }

  return {
    props: { session, posts },
  };
};
