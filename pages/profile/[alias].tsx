import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import {
  ProfileImage,
  Calendar,
  Container,
  IconLink,
  IconLinkType,
  Location,
  Profile,
  Tabs,
  TabsItem,
  Avatar,
  AvatarSize,
} from '@smartive-education/design-system-component-library-musketeers';
import { getToken } from 'next-auth/jwt';
import { QJWT } from '../api/auth/[...nextauth]';
import { fetchLikedPostsWithUsers, fetchPostsWithUsers, fetchUser } from '../../services/qwacker.service';
import { ProfileQuery, UserModel } from '../../models/user.model';
import { useEffect, useState } from 'react';
import Timeline from '../../components/timeline';
import { QwackModelDecorated } from '../../models/qwacker.model';
import Image from 'next/image';

type Props = {
  user: UserModel;
  posts: QwackModelDecorated[];
  postsLiked: QwackModelDecorated[];
  isPersonal: boolean;
};

export default function ProfilePage({
  user,
  posts,
  postsLiked,
  isPersonal,
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const [activeTab, setActiveTab] = useState('mumbles');
  const [activePosts, setActivePosts] = useState(posts);

  useEffect(() => {
    setActivePosts(posts);
  }, [posts]);

  return (
    <>
      <Head>
        <title>{'Profile'}</title>
      </Head>

      <Container>
        <div className={'relative mb-l'}>
          <Image className={'rounded-16'} src={'https://picsum.photos/680/320'} width={680} height={320} alt={''}></Image>
          <div className={'absolute bottom-[-80px] right-[32px]'}>
            {isPersonal ? (
              <ProfileImage
                alt="Profile Image alt attribute text"
                onClick={() => undefined}
                src={'https://picsum.photos/160/160?random=' + user.id}
              />
            ) : (
              <Avatar
                showBorder={true}
                alt="Avatar"
                size={AvatarSize.XL}
                src={'https://picsum.photos/160/160?random=' + user.id}
              />
            )}
          </div>
        </div>

        <div className={'mb-l'}>
          <div>
            <h1 className="heading-3 text-slate-900">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex gap-s mb-xs">
              <IconLink type={IconLinkType.VIOLET} label={user?.userName} onClick={() => undefined}>
                <Profile />
              </IconLink>
              <IconLink type={IconLinkType.DEFAULT} label={'City'} onClick={() => undefined}>
                <Location />
              </IconLink>
              <IconLink type={IconLinkType.DEFAULT} label={'Member since X Weeks'} onClick={() => undefined}>
                <Calendar />
              </IconLink>
            </div>
            <p className={'text-slate-400 text-18'}>
              Donec tellus diam, vestibulum sit amet vehicula quis, sagittis sit amet nunc. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
            </p>
          </div>
        </div>
        <div>
          {isPersonal ? (
            <div className={'mb-l'}>
              <Tabs>
                <TabsItem
                  onClick={() => {
                    setActiveTab('mumbles');
                    setActivePosts(posts);
                  }}
                  label={'Deine Mumbels'}
                  active={activeTab === 'mumbles'}
                ></TabsItem>
                <TabsItem
                  onClick={() => {
                    setActiveTab('likes');
                    setActivePosts(postsLiked);
                  }}
                  label={'Deine Likes'}
                  active={activeTab === 'likes'}
                ></TabsItem>
              </Tabs>
            </div>
          ) : null}
          {activePosts.length > 0 ? <Timeline posts={activePosts} /> : <div>There are no mumbles yet</div>}
        </div>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const userId = ctx.query.alias as string;
  const token = (await getToken(ctx)) as QJWT;
  const userData = await fetchUser({ token: token.accessToken, id: userId });

  if (!userData) {
    return {
      notFound: true,
    };
  }

  const postsDecorated = await fetchPostsWithUsers({ token: token.accessToken, creator: userData.id });

  let postsLikedDecorated = null;
  if (userId === ProfileQuery.me && token.sub) {
    postsLikedDecorated = await fetchLikedPostsWithUsers({ token: token.accessToken, id: token.sub });
  }

  return {
    props: {
      user: userData,
      posts: postsDecorated,
      postsLiked: postsLikedDecorated,
      isPersonal: userId === ProfileQuery.me,
    },
  };
};
