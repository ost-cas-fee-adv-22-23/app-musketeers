import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import { QJWT } from '../api/auth/[...nextauth]';
import { createReply, fetchRepliesWithUser, fetchSinglePost } from '../../services/posts.service';
import { fetchCachedUser } from '../../services/users.service';
import { QwackModelDecorated } from '../../models/qwacker.model';
import Head from 'next/head';
import { Card, CardSize, Container } from '@smartive-education/design-system-component-library-musketeers';
import Mumble from '../../components/mumble';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import MumbleAdd from '../../components/mumble-add';
import { ProfileQuery, UserModel } from '../../models/user.model';
import { getClientToken } from '../../helpers/session.helpers';
import { toast } from 'react-toastify';
import { PROFILE_IMG_URL } from '../../constants/qwacker.constants';

type Props = {
  mumble: QwackModelDecorated;
  personalData: UserModel;
  replies: QwackModelDecorated[];
};

export default function MumblePage({
  mumble,
  personalData,
  replies,
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const router = useRouter();
  const { data: session } = useSession();
  const token = getClientToken(session);
  const [repliesState, setRepliesState] = useState<QwackModelDecorated[]>(replies || []);

  const reFetchAndSetReplies = async ({ successMessage }: { successMessage: string }) => {
    const repliesPromise = fetchRepliesWithUser({ token, id: mumble.id });
    const replies = await toast.promise(repliesPromise, {
      error: 'Etwas ist schief gelaufen, versuch es nochmals!',
      success: successMessage,
    });

    setRepliesState(replies);
  };

  return (
    <>
      <Head>
        <title>{'Mumble Detail'}</title>
      </Head>
      <Container>
        <Card size={CardSize.XL} hasRoundBorders={true}>
          <Mumble
            mumbleData={mumble}
            avatarUrl={PROFILE_IMG_URL + mumble.creator}
            onDeleteCallback={() => {
              router.push(`/`);
            }}
          >
            <div className={'mt-l'}>
              <MumbleAdd
                isInline={true}
                user={personalData}
                avatarUrl={PROFILE_IMG_URL + personalData.id}
                title={'Hey, was gibt’s neues?'}
                onSend={async (text, file, setText, setFile) => {
                  toast('Dein Kommentar wird gesendet...');
                  await createReply(token, mumble.id, { text: text, image: file });
                  await reFetchAndSetReplies({ successMessage: 'Dein Kommentar wurde gesendet!' });
                  setText('');
                  setFile(null);
                }}
              />

              {repliesState.map((mumble, index) => {
                return (
                  <div key={index} className={'pb-l mt-l border-b-2 last:border-b-0 border-slate-100'}>
                    <Mumble
                      isInline={true}
                      mumbleData={mumble}
                      avatarUrl={PROFILE_IMG_URL + mumble.creator}
                      onDeleteCallback={() => {
                        reFetchAndSetReplies({ successMessage: 'Reply wurde gelöscht!' });
                      }}
                    ></Mumble>
                  </div>
                );
              })}
            </div>
          </Mumble>
        </Card>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const mumbleId = ctx.query.id as string;
  const token = (await getToken(ctx)) as QJWT;

  const mumble = await fetchSinglePost({ token: token.accessToken, id: mumbleId });

  if (!mumble) {
    return {
      notFound: true,
    };
  }

  const userData = await fetchCachedUser({ token: token.accessToken, id: mumble.creator });
  const personalData = await fetchCachedUser({ token: token.accessToken, id: ProfileQuery.me });
  const replies = await fetchRepliesWithUser({ token: token.accessToken, id: mumbleId });

  return {
    props: {
      mumble: { ...mumble, creatorData: userData },
      personalData,
      replies,
    },
  };
};
