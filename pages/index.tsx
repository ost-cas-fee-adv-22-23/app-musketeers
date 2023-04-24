import Head from 'next/head';
import { Card, CardSize, Container } from '@smartive-education/design-system-component-library-musketeers';
import MumbleAdd from '../components/mumble-add';
import Timeline from '../components/timeline';
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';
import { createPost, fetchPostsWithUsers } from '../services/posts.service';
import { QJWT } from './api/auth/[...nextauth]';
import { QwackModelDecorated } from '../models/qwacker.model';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingIndicator from '../components/loading-indicator';
import { getClientToken } from '../helpers/session.helpers';
import { toast } from 'react-toastify';
import { PROFILE_IMG_URL } from '../constants/qwacker.constants';

const POSTS_LIMIT = 7;

interface PageHomeProps {
  posts: QwackModelDecorated[];
}

export default function PageHome(props: PageHomeProps) {
  const [posts, setPosts] = useState<QwackModelDecorated[]>(props.posts);
  const [isLoadingPosts, setIsLoadingPosts] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const bottomBoundaryRef = useRef(null);
  const { data: session } = useSession();
  const token = getClientToken(session);

  // Instantiate a scrollObserver for the bottomBoundaryRef, useCallback to persist the observer across renders
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

  // Fetch more posts if bottomBoundaryRef is visible, but only do it once, when isIntersecting changes from false to true
  useEffect(() => {
    if (isIntersecting) {
      fetchMorePosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  const fetchMorePosts = async () => {
    setIsLoadingPosts(true);
    if (token && posts.length > 0) {
      const newPosts = await fetchPostsWithUsers({
        token,
        limit: POSTS_LIMIT,
        olderThan: posts[posts.length - 1].id,
      });
      const newPostsAggregated = [...posts, ...newPosts];
      setPosts(newPostsAggregated);
    }
    setIsLoadingPosts(false);
  };

  const reFetchAndSetPosts = async () => {
    if (token) {
      const posts = await fetchPostsWithUsers({
        token,
        limit: POSTS_LIMIT,
        offset: 0,
      });
      setPosts(posts);
    }
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
              avatarUrl={PROFILE_IMG_URL + session?.token.sub}
              onSend={async (text, file, setText, setFile) => {
                const createPostPromise = createPost(token, { text, image: file });
                await toast.promise(createPostPromise, {
                  pending: 'Mumble wird gesendet...',
                  error: 'Etwas ist schief gelaufen, versuch es nochmals!',
                  success: 'Dein Mumble wurde erfolgreich versendet',
                });
                await reFetchAndSetPosts();
                setText('');
                setFile(null);
              }}
            />
          </Card>
        </div>
        <Timeline
          posts={posts}
          onDeleteCallback={async () => {
            await reFetchAndSetPosts();
            toast.success('Mumble wurde gelöscht...');
          }}
        />
        <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
        <LoadingIndicator isLoading={isLoadingPosts} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);

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
