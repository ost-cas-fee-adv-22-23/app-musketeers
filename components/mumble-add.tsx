import {
  Avatar,
  AvatarSize,
  Button,
  ButtonSize,
  ButtonType,
  IconLink,
  IconLinkType,
  Profile,
  Send,
  Textarea,
  Upload,
} from '@smartive-education/design-system-component-library-musketeers';
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react';
import { UserModel } from '../models/user.model';
import Image from 'next/image';
import { CloseIcon } from 'next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon';

type MumbleAddProps = {
  user?: UserModel;
  title: string;
  avatarUrl: string;
  onSend: (
    text: string,
    file: File | null,
    setText: Dispatch<SetStateAction<string>>,
    setFile: Dispatch<SetStateAction<File | null>>
  ) => void;
  isInline?: boolean;
};

const CHAR_COUNT = 280;

function MumbleAdd(props: MumbleAddProps) {
  const [text, setText] = useState('');
  const [hasError, setHasError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const triggerUploadFileDialog = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const fileObj = target.files && target.files[0];
    if (!fileObj) {
      return;
    }

    target.value = '';

    setFile(fileObj);
  };

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

      {file ? (
        <div className={'my-s max-h-[375px] overflow-hidden'}>
          <div className={'flex justify-between mb-s'}>
            <div>
              <p className={'text-18'}>Image-Preview</p>
              <p className={'text-14 text-slate-400'}>This is only a preview, double check if its the right picture</p>
            </div>

            <IconLink type={IconLinkType.VIOLET} onClick={() => setFile(null)}>
              <CloseIcon />
            </IconLink>
          </div>

          <Image src={file ? URL.createObjectURL(file) : ''} width={375} height={150} alt={'Image Preview'}></Image>
        </div>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-xs mt-xs">
        <input className={'hidden'} ref={inputRef} type="file" onChange={(e) => handleFileChange(e)} />
        <Button
          label="Bild hochladen"
          onClick={triggerUploadFileDialog}
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
            props.onSend(text, file, setText, setFile);
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
