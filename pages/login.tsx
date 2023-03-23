import { Button, ButtonSize, ButtonType, Mumble } from '@smartive-education/design-system-component-library-musketeers';
import Head from 'next/head';
import { LoginRegistrationContainer } from '../components/login-registration-container';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

function Login() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <LoginRegistrationContainer>
        <h2 className={'heading-2 text-slate-900 mb-m'}>{!session ? 'Anmelden' : 'Erfolgreich eingelogt'}</h2>
        {!session ? (
          <Button
            label="Let's mumble"
            onClick={() => signIn('zitadel')}
            size={ButtonSize.M}
            type={ButtonType.GRADIENT}
            isFullWidth
          >
            <Mumble />
          </Button>
        ) : (
          ''
        )}
      </LoginRegistrationContainer>
    </>
  );
}

Login.getLayout = (page: ReactElement) => page;

export default Login;
