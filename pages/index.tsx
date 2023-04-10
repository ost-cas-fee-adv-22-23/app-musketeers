import Head from 'next/head';
import { Card, CardSize, Container } from '@smartive-education/design-system-component-library-musketeers';
import MumbleAdd from '../components/mumble-add';
import Timeline from '../components/timeline';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { createPost, fetchPostsWithUsers } from '../services/qwacker.service';
import { QJWT } from './api/auth/[...nextauth]';
import { QwackModelDecorated } from '../models/qwacker.model';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingIndicator from '../components/loading-indicator';
import { getClientToken } from '../helpers/getClientToken';
import { REDIRECT_LOGIN } from '../constants/qwacker.constants';

const POSTS_LIMIT = 7;

interface PageHomeProps {
  posts: QwackModelDecorated[];
}

export default function PageHome(props: PageHomeProps) {
  const [posts, setPosts] = useState<QwackModelDecorated[]>(props.posts);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const { data: session } = useSession();
  const token = getClientToken(session);
  const bottomBoundaryRef = useRef(null);
  const currentOffset = posts.length;

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
          <Card size={CardSize.XL} hasRoundBorders={true}>
            <MumbleAdd
              title={'Hey, was gibt’s neues?'}
              avatarUrl={'https://picsum.photos/160/160?random=' + session?.token.sub}
              onImageUpload={() => console.log('onImageUpload')}
              onSend={async (text) => {
                await createPost(token, { text });
              }}
            />
          </Card>
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
    return REDIRECT_LOGIN;
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
