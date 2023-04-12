import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import { QJWT } from '../api/auth/[...nextauth]';
import { createReply, fetchRepliesWithUser, fetchSinglePost, fetchUser } from '../../services/qwacker.service';
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

  const refetchAndSetReplies = async ({ successMessage }: { successMessage: string }) => {
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
            avatarUrl={'https://picsum.photos/160/160?random=' + mumble.creator}
            onClickTimestamp={() => undefined}
            onClickUserName={(e) => {
              e.preventDefault();
              router.push(`/profile/${mumble.creator}`);
            }}
          >
            <div className={'mt-l'}>
              <MumbleAdd
                isInline={true}
                user={personalData}
                avatarUrl={'https://picsum.photos/160/160?random=' + personalData.id}
                title={'Hey, was gibt’s neues?'}
                onImageUpload={() => undefined}
                onSend={async (text) => {
                  toast('Dein Reply wird gesendet...');
                  await createReply(token, mumble.id, { text: text });
                  refetchAndSetReplies({ successMessage: 'Dein Reply wurde gesendet!' });
                }}
              />

              {repliesState.map((mumble, index) => {
                return (
                  <div key={index} className={'pb-l mt-l border-b-2 last:border-b-0 border-slate-100'}>
                    <Mumble
                      isInline={true}
                      mumbleData={mumble}
                      avatarUrl={'https://picsum.photos/160/160?random=' + mumble.creator}
                      onClickTimestamp={() => undefined}
                      onClickUserName={(e) => {
                        e.preventDefault();
                        router.push(`/profile/${mumble.creator}`);
                      }}
                      onDeleteCallback={() => {
                        refetchAndSetReplies({ successMessage: 'Reply wurde gelöscht!' });
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
  const userData = await fetchUser({ token: token.accessToken, id: mumble.creator });
  const personalData = await fetchUser({ token: token.accessToken, id: ProfileQuery.me });
  const replies = await fetchRepliesWithUser({ token: token.accessToken, id: mumbleId });

  return {
    props: {
      mumble: { ...mumble, creatorData: userData },
      personalData,
      replies,
    },
  };
};
