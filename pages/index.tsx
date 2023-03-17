import Head from 'next/head';
import Image from 'next/image';
import { Container, Avatar, AvatarSize } from '@smartive-education/design-system-component-library-musketeers';
import MumbleAdd from '../components/mumble-add';
import Timeline from '../components/timeline';

export default function PageHome() {
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
          <MumbleAdd
            title={'Hey, was gibt’s neues?'}
            avatar={
              <Avatar
                alt="Display Name @displayName"
                showBorder
                size={AvatarSize.M}
                imageElementType={Image}
                imageComponentProps={{ width: '480', height: '480' }}
                src="https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg"
              />
            }
            onImageUpload={() => console.log('onImageUpload')}
            onSend={() => console.log('onSend')}
          />
        </div>
        <Timeline />
      </Container>
    </>
  );
}
