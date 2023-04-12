import {
  Textarea,
  Button,
  ButtonType,
  ButtonSize,
  Upload,
  Send,
  IconLinkType,
  Profile,
  IconLink,
  Avatar,
  AvatarSize,
} from '@smartive-education/design-system-component-library-musketeers';
import { useState } from 'react';
import { UserModel } from '../models/user.model';
import Image from 'next/image';

type MumbleAddProps = {
  user?: UserModel;
  title: string;
  avatarUrl: string;
  onImageUpload: () => void;
  onSend: (text: string) => void;
  isInline?: boolean;
};

const CHAR_COUNT = 280;

function MumbleAdd(props: MumbleAddProps) {
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {props.isInline ? (
        <div className={'flex items-center mb-s'}>
          <div>
            <Avatar
              alt="Display Name @displayName"
              size={AvatarSize.S}
              imageElementType={Image}
              imageComponentProps={{ width: '480', height: '480' }}
              src={props.avatarUrl}
            />
          </div>
          <div className={'flex flex-col ml-xs'}>
            <span>
              {props.user?.firstName} {props.user?.lastName}
            </span>
            <IconLink type={IconLinkType.VIOLET} label={props.user?.userName} href="" target="" onClick={() => undefined}>
              <Profile />
            </IconLink>
            <span></span>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute -top-s -left-[80px] hidden sm:block">
            <Avatar
              alt="Display Name @displayName"
              size={AvatarSize.M}
              imageElementType={Image}
              imageComponentProps={{ width: '480', height: '480' }}
              src={props.avatarUrl}
            />
          </div>

          <div className="label-xl text-slate-900 mb-s">{props.title}</div>
        </>
      )}

      <Textarea
        onChange={(event) => {
          setHasError(false);
          const inputEvent = event.nativeEvent as InputEvent;
          if (text.length < CHAR_COUNT || inputEvent.inputType === 'deleteContentBackward') {
            setText(event.target.value);
          }
        }}
        placeholder="Deine Meinung zählt!"
        rows={5}
        value={text}
        hasError={hasError}
        errorMessage={hasError ? 'Bitte gib einen Text ein!' : ''}
      />

      <span className={'text-right w-full block'}>
        {text.length} / {CHAR_COUNT}
      </span>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-xs mt-xs">
        <Button
          label="Bild hochladen"
          onClick={props.onImageUpload}
          type={ButtonType.DEFAULT}
          size={ButtonSize.M}
          isFullWidth={true}
          showBorder={false}
        >
          <Upload />
        </Button>
        <Button
          label="Absenden"
          onClick={() => {
            if (text.trim().length === 0) {
              return setHasError(true);
            }
            props.onSend(text);
          }}
          type={ButtonType.VIOLET}
          size={ButtonSize.M}
          isFullWidth={true}
          showBorder={false}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}

export default MumbleAdd;
