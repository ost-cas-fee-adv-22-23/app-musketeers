import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getToken } from 'next-auth/jwt';
import { QJWT } from '../api/auth/[...nextauth]';
import { fetchPostsByHashtags } from '../../services/posts.service';
import { QwackModelDecorated } from '../../models/qwacker.model';
import Head from 'next/head';
import { Container, Hashtag, HashtagSize } from '@smartive-education/design-system-component-library-musketeers';
import Timeline from '../../components/timeline';
import { useRouter } from 'next/router';

type Props = {
  posts: QwackModelDecorated[];
};

export default function ResultsPage({ posts }: Props): InferGetServerSidePropsType<typeof getServerSideProps> {
  const router = useRouter();
  const hashtag = router.query?.id?.toString() || '';

  return (
    <>
      <Head>
        <title>{'Search Results'}</title>
      </Head>
      <Container>
        <h1 className="heading-2 text-violet-600 mb-xs" data-testid={'heading'}>
          Suchresultate
        </h1>
        <h2 className="heading-4 text-slate-500">Mumbles mit dem Hashtag:</h2>
        <div className="mb-m">
          <Hashtag testid={'hashtag-result'} size={HashtagSize.L} onClick={(event) => event} label={hashtag} />
        </div>
        <Timeline posts={posts} />
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const hashtag = ctx.query.id as string;
  const token = (await getToken(ctx)) as QJWT;
  const posts = await fetchPostsByHashtags({ token: token.accessToken, tags: [hashtag] });

  return {
    props: {
      posts,
    },
  };
};
