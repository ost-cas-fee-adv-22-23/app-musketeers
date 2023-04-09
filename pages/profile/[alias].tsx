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
import { UserModel } from '../../models/user.model';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import Timeline from '../../components/timeline';
import { QwackModelDecorated } from '../../models/qwacker.model';
import { REDIRECT_LOGIN, REDIRECT_NOT_FOUND } from '../../constants/qwacker.constants';

type Props = {
  user: UserModel;
  posts: QwackModelDecorated[];
  postsLiked: QwackModelDecorated[];
  isPersonal: boolean;
};

enum ProfileQuery {
  me = 'me',
}

export default function ProfilePage({
  user,
  posts,
  postsLiked,
  isPersonal,
}: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const [activeTab, setActiveTab] = useState('mumbles');
  const [activePosts, setActivePosts] = useState(posts);

  return (
    <>
      <Head>
        <title>{'Profile'}</title>
      </Head>

      <Container>
        <div className={'flex justify-between items-baseline mb-l'}>
          <div>
            <h1 className="heading-3 text-slate-900">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex gap-s">
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
          </div>
          {isPersonal ? (
            <ProfileImage
              alt="Profile Image alt attribute text"
              onClick={() => undefined}
              src="https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg"
            />
          ) : (
            <Avatar
              alt="Avatar"
              size={AvatarSize.XL}
              src="https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg"
            />
          )}
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
  const session = await getSession(ctx);
  if (!session) {
    return REDIRECT_LOGIN;
  }

  const userId = ctx.query.alias as string;
  const token = (await getToken(ctx)) as QJWT;
  const userData = await fetchUser({ token: token.accessToken, id: userId });

  if (!userData) {
    return REDIRECT_NOT_FOUND;
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
