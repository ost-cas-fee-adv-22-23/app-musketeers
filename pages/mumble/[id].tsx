import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { REDIRECT_LOGIN } from '../../constants/qwacker.constants';
import { getToken } from 'next-auth/jwt';
import { QJWT } from '../api/auth/[...nextauth]';
import { createReply, fetchRepliesWithUser, fetchSinglePost, fetchUser } from '../../services/qwacker.service';
import { QwackModelDecorated } from '../../models/qwacker.model';
import Head from 'next/head';
import {
  Avatar,
  AvatarSize,
  Card,
  CardSize,
  Container,
  Hashtag,
  HashtagSize,
  Interaction,
  InteractionType,
  Share,
} from '@smartive-education/design-system-component-library-musketeers';
import Mumble from '../../components/mumble';
import Image from 'next/image';
import CommentInteraction from '../../components/comment-interaction';
import LikeInteraction from '../../components/like-interaction';
import { parseHashtags } from '../../helpers/common.helpers';
import { useRouter } from 'next/router';
import MumbleAdd from '../../components/mumble-add';
import { ProfileQuery, UserModel } from '../../models/user.model';
import { getClientToken } from '../../helpers/getClientToken';

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

  return (
    <>
      <Head>
        <title>{'Mumble Detail'}</title>
      </Head>
      <Container>
        <Card size={CardSize.XL} hasRoundBorders={true}>
          <Mumble
            avatar={
              <Avatar
                alt="Display Name @displayName"
                showBorder
                size={AvatarSize.M}
                imageElementType={Image}
                imageComponentProps={{ width: '480', height: '480' }}
                src={'https://picsum.photos/160/160?random=' + mumble.creator}
              />
            }
            displayName={`${mumble.creatorData.firstName} ${mumble.creatorData.lastName}`}
            footer={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-xs">
                <CommentInteraction
                  onClick={(event) => {
                    event.preventDefault();
                    router.push('/mumble/' + mumble.id);
                  }}
                  initialCount={mumble.replyCount}
                />
                <LikeInteraction initialCount={mumble.likeCount} likedByUser={mumble.likedByUser} postId={mumble.id} />
                <Interaction onClick={(event) => event} type={InteractionType.DEFAULT}>
                  <Share />
                  Copy link
                </Interaction>
              </div>
            }
            onClickTimestamp={() => undefined}
            onClickUserName={(e) => {
              e.preventDefault();
              router.push(`/profile/${mumble.creator}`);
            }}
            timestamp="timestamp"
            userName={mumble.creatorData.userName}
            mumble={
              <div className={'pt-m'}>
                <div>{mumble.text}</div>
                <div className="flex gap-xs">
                  {parseHashtags(mumble.text).map((hashtag: string) => (
                    <Hashtag key={hashtag} size={HashtagSize.M} label={hashtag} onClick={(event) => event} />
                  ))}
                </div>
                {mumble.mediaUrl && (
                  <div className={'mt-s'}>
                    <Image width={640} height={480} alt="" className="block rounded-default" src={mumble.mediaUrl} />
                  </div>
                )}
              </div>
            }
          >
            <div className={'mt-l'}>
              <MumbleAdd
                isInline={true}
                user={personalData}
                title={'Hey, was gibt’s neues?'}
                avatar={
                  <Avatar
                    alt="Display Name @displayName"
                    size={AvatarSize.S}
                    imageElementType={Image}
                    imageComponentProps={{ width: '480', height: '480' }}
                    src={'https://picsum.photos/160/160?random=' + personalData.id}
                  />
                }
                onImageUpload={() => undefined}
                onSend={async (text) => {
                  await createReply(token, mumble.id, { text: text });
                }}
              />

              {replies.map((mumble, index) => {
                return (
                  <div key={index} className={'pb-l mt-l border-b-2 last:border-b-0 border-slate-100'}>
                    <Mumble
                      isInline={true}
                      avatar={
                        <Avatar
                          alt="Display Name @displayName"
                          showBorder
                          size={AvatarSize.S}
                          imageElementType={Image}
                          imageComponentProps={{ width: '480', height: '480' }}
                          src={'https://picsum.photos/160/160?random=' + mumble.creator}
                        />
                      }
                      displayName={`${mumble.creatorData.firstName} ${mumble.creatorData.lastName}`}
                      footer={
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-xs">
                          <CommentInteraction
                            onClick={(event) => {
                              event.preventDefault();
                              router.push('/mumble/' + mumble.id);
                            }}
                            initialCount={mumble.replyCount}
                          />
                          <LikeInteraction
                            initialCount={mumble.likeCount}
                            likedByUser={mumble.likedByUser}
                            postId={mumble.id}
                          />
                          <Interaction onClick={(event) => event} type={InteractionType.DEFAULT}>
                            <Share />
                            Copy link
                          </Interaction>
                        </div>
                      }
                      onClickTimestamp={() => undefined}
                      onClickUserName={(e) => {
                        e.preventDefault();
                        router.push(`/profile/${mumble.creator}`);
                      }}
                      timestamp="timestamp"
                      userName={mumble.creatorData.userName}
                      mumble={
                        <>
                          <div>{mumble.text}</div>
                          <div className="flex gap-xs">
                            {parseHashtags(mumble.text).map((hashtag: string) => (
                              <Hashtag key={hashtag} size={HashtagSize.M} label={hashtag} onClick={(event) => event} />
                            ))}
                          </div>
                          {mumble.mediaUrl && (
                            <div className={'mt-s'}>
                              <Image
                                width={640}
                                height={480}
                                alt=""
                                className="block rounded-default"
                                src={mumble.mediaUrl}
                              />
                            </div>
                          )}
                        </>
                      }
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
  const session = await getSession(ctx);
  if (!session) {
    return REDIRECT_LOGIN;
  }

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
