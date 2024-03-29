import { Button, ButtonSize, ButtonType, Mumble } from '@smartive-education/design-system-component-library-musketeers';
import Head from 'next/head';
import { LoginRegistrationContainer } from '../components/login-registration-container';
import type { ReactElement } from 'react';
import { signIn } from 'next-auth/react';

function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <LoginRegistrationContainer>
        <h2 className={'heading-2 text-slate-900 mb-m'}>Melde Dich an</h2>
        <Button
          label="Let's mumble"
          onClick={() => signIn('zitadel', { callbackUrl: '/' })}
          size={ButtonSize.M}
          type={ButtonType.GRADIENT}
          isFullWidth
          testid={'button-login'}
        >
          <Mumble />
        </Button>
      </LoginRegistrationContainer>
    </>
  );
}

Login.getLayout = (page: ReactElement) => page;

export default Login;
