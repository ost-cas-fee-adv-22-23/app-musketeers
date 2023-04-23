import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import {
  Avatar,
  AvatarSize,
  Calendar,
  Container,
  IconLink,
  IconLinkType,
  Location,
  Profile,
  ProfileImage,
  Tabs,
  TabsItem,
} from '@smartive-education/design-system-component-library-musketeers';
import { getToken } from 'next-auth/jwt';
import { QJWT } from '../api/auth/[...nextauth]';
import { fetchLikedPostsWithUsers, fetchPostsWithUsers } from '../../services/posts.service';
import { fetchUser } from '../../services/users.service';
import { ProfileQuery, UserModel } from '../../models/user.model';
import { useEffect, useRef, useState } from 'react';
import Timeline from '../../components/timeline';
import { ProfileTabType, QwackModelDecorated } from '../../models/qwacker.model';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { getClientToken } from '../../helpers/session.helpers';
import { useContainerDimensions } from '../../helpers/common.helpers';
import { PROFILE_IMG_URL } from '../../constants/qwacker.constants';

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
  const [activeTab, setActiveTab] = useState(ProfileTabType.MUMBLES);
  const [activePosts, setActivePosts] = useState(posts);
  const containerReference = useRef<HTMLDivElement>(null);
  const { width } = useContainerDimensions(containerReference);
  const { data: session } = useSession();
  const token = getClientToken(session);
  const avatarClasses = ['absolute right-[32px]'];

  useEffect(() => {
    setActivePosts(posts);
  }, [posts]);

  const reFetchAndSetPosts = async () => {
    if (token) {
      if (activeTab === ProfileTabType.MUMBLES) {
        const postsDecorated = await fetchPostsWithUsers({ token: token, creator: user.id });
        setActivePosts(postsDecorated);
      } else {
        const postsLikedDecorated = await fetchLikedPostsWithUsers({ token: token, id: user.id });
        setActivePosts(postsLikedDecorated);
      }
    }
  };

  if (width < 768) {
    avatarClasses.push('bottom-[-45px]');
  } else {
    avatarClasses.push('bottom-[-80px]');
  }

  return (
    <div ref={containerReference}>
      <Head>
        <title>{'Profile'}</title>
      </Head>

      <Container>
        <div className={'relative mb-l'}>
          <Image className={'rounded-16'} src={'https://picsum.photos/680/320'} width={680} height={320} alt={''}></Image>
          <div className={avatarClasses.join(' ')}>
            {isPersonal ? (
              <ProfileImage
                size={width < 768 ? AvatarSize.L : AvatarSize.XL}
                alt="Profile Image alt attribute text"
                onClick={() => undefined}
                src={PROFILE_IMG_URL + user.id}
              />
            ) : (
              <Avatar
                showBorder={true}
                alt="Avatar"
                size={width < 768 ? AvatarSize.L : AvatarSize.XL}
                src={PROFILE_IMG_URL + user.id}
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
                    setActiveTab(ProfileTabType.MUMBLES);
                    setActivePosts(posts);
                  }}
                  label={'Deine Mumbels'}
                  active={activeTab === ProfileTabType.MUMBLES}
                ></TabsItem>
                <TabsItem
                  onClick={() => {
                    setActiveTab(ProfileTabType.LIKES);
                    setActivePosts(postsLiked);
                  }}
                  label={'Deine Likes'}
                  active={activeTab === ProfileTabType.LIKES}
                ></TabsItem>
              </Tabs>
            </div>
          ) : null}
          <Timeline
            posts={activePosts}
            onDeleteCallback={async () => {
              await reFetchAndSetPosts();
              toast.success('Mumble wurde gelöscht...');
            }}
          />
        </div>
      </Container>
    </div>
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
