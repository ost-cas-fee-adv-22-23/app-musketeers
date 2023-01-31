import { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { Header } from '@smartive-education/design-system-component-library-musketeers';

export default function PageHome(): InferGetStaticPropsType<typeof getServerSideProps> {
  return (
    <>
      <Header onClickLogo={(e) => e} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => ({
  props: { posts: require('../data/posts.json') },
});
