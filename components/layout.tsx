import Header from './header';
import { PropsWithChildren } from 'react';

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className="bg-slate-100 min-h-screen py-xl">{props.children}</main>
    </>
  );
}
