import {
  Button,
  ButtonSize,
  ButtonType,
  Eye,
  Input,
  InputType,
  Mumble,
} from '@smartive-education/design-system-component-library-musketeers';
import Head from 'next/head';
import { LoginRegistrationContainer } from '../components/login-registration-container';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <LoginRegistrationContainer>
        <h2 className={'heading-2 text-slate-900 mb-m'}>Anmelden</h2>
        <form className={'mb-m'}>
          <Input
            label="E-Mail"
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            type={InputType.TEXT}
            value={email}
          />
          <Input
            label="Passwort"
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            type={InputType.PASSWORD}
            value={password}
          >
            <Eye />
          </Input>
        </form>
        <Button label="Let's mumble" onClick={() => undefined} size={ButtonSize.M} type={ButtonType.GRADIENT} isFullWidth>
          <Mumble />
        </Button>
        <span className={'label-s text-center block mt-s'}>
          Noch kein Account?
          <Link href={'/registration'}>Jetzt registrieren</Link>
        </span>
      </LoginRegistrationContainer>
    </>
  );
}
