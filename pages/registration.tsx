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
import Link from 'next/link';
import { LoginRegistrationContainer } from '../components/login-registration-container';
import { useState } from 'react';

export default function Registration() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Head>
        <title>Registration</title>
      </Head>

      <LoginRegistrationContainer>
        <h2 className={'heading-2 text-slate-900 mb-m'}>Registrieren</h2>
        <form className={'mb-m'}>
          <Input
            label="Vorname Name"
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            type={InputType.TEXT}
            value={name}
          />
          <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            placeholder=""
            type={InputType.TEXT}
            value={username}
          />
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
          Bereits registriert?
          <Link href={'/login'}>Jetzt anmelden</Link>
        </span>
      </LoginRegistrationContainer>
    </>
  );
}
