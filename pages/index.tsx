import Head from 'next/head';
import Image from 'next/image';
import { Container, Avatar, AvatarSize } from '@smartive-education/design-system-component-library-musketeers';
import MumbleAdd from '../components/mumble-add';
import Timeline from '../components/timeline';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { fetchPostsWithUsers } from '../services/qwacker.service';
import { QJWT } from './api/auth/[...nextauth]';
import { QwackModelDecorated } from '../models/qwacker.model';
import { useState, useEffect, useRef, useCallback } from 'react';
import LoadingIndicator from '../components/loading-indicator';
import { getClientToken } from '../helpers/getClientToken';

const POSTS_LIMIT = 7;

interface PageHomeProps {
  posts: QwackModelDecorated[];
}

export default function PageHome(props: PageHomeProps) {
  const [posts, setPosts] = useState<QwackModelDecorated[]>(props.posts);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const currentOffset = posts.length;
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const { data: session } = useSession();
  const token = getClientToken(session);
  const bottomBoundaryRef = useRef(null);

  const scrollObserver = useCallback((node: Element) => {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          setIsIntersecting(true);
        } else {
          setIsIntersecting(false);
        }
      });
    }).observe(node);
  }, []);

  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver]);

  useEffect(() => {
    if (isIntersecting) {
      fetchMorePosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  const fetchMorePosts = async () => {
    setIsLoadingPosts(true);
    if (token) {
      const newPosts = await fetchPostsWithUsers({
        token,
        limit: POSTS_LIMIT,
        offset: currentOffset,
      });
      const newPostsAggregated = [...posts, ...newPosts];
      setPosts(newPostsAggregated);
    }
    setIsLoadingPosts(false);
  };

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
        <Timeline posts={posts} />
        <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
        <LoadingIndicator isLoading={isLoadingPosts} />
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
  let posts: QwackModelDecorated[] = [];

  if (token) {
    posts = await fetchPostsWithUsers({
      token: token.accessToken,
      limit: POSTS_LIMIT,
      offset: 0,
    });
  }

  return {
    props: { session, posts },
  };
};
