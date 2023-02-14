import Header from './header';
import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}
