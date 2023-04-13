import Head from 'next/head';
import {
  Button,
  ButtonSize,
  ButtonType,
  Container,
  Eye,
  Input,
  InputType,
  Mumble,
  Textarea,
} from '@smartive-education/design-system-component-library-musketeers';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export default function PageHome() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  return (
    <>
      <Head>
        <title>Settings</title>
      </Head>

      <Container>
        <h1 className="heading-2 text-violet-600 mb-xs">Einstellungen</h1>

        <h2 className="heading-4 text-slate-500">Persönliche Einstellungen</h2>
        <form className={'my-m'}>
          <Input
            label="Vorname Name"
            onChange={(e) => setName(e.target.value)}
            placeholder=""
            type={InputType.TEXT}
            value={name}
          />
          <Input
            label="E-Mail Adresse"
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            type={InputType.TEXT}
            value={email}
          />
          <Input
            label="Ortschaft"
            onChange={(e) => setCity(e.target.value)}
            placeholder=""
            type={InputType.TEXT}
            value={city}
          />
          <Textarea label="Biografie" onChange={(e) => setBio(e.target.value)} placeholder="" value={bio} />
        </form>

        <h2 className="heading-4 text-slate-500">Passwort ändern</h2>
        <form className={'my-m'}>
          <Input
            label="Altes Passwort"
            onChange={(e) => setOldPass(e.target.value)}
            placeholder=""
            type={InputType.PASSWORD}
            value={oldPass}
          >
            <Eye />
          </Input>{' '}
          <Input
            label="Neues Passwort"
            onChange={(e) => setNewPass(e.target.value)}
            placeholder=""
            type={InputType.PASSWORD}
            value={newPass}
          >
            <Eye />
          </Input>
        </form>

        <Button
          label="Abbrechen"
          onClick={() => {
            router.push('/');
          }}
          size={ButtonSize.M}
          type={ButtonType.GREY}
          isFullWidth
        >
          <Mumble />
        </Button>
        <Button
          label="Speichern"
          onClick={() => {
            toast('Dein Profil wurde erfolgreich aktualisiert', { type: 'success' });
          }}
          size={ButtonSize.M}
          type={ButtonType.VIOLET}
          isFullWidth
        >
          <Mumble />
        </Button>
      </Container>
    </>
  );
}
