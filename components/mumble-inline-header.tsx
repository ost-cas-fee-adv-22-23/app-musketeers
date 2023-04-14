import {
  Avatar,
  AvatarSize,
  IconLink,
  IconLinkType,
  Profile,
  Time,
} from '@smartive-education/design-system-component-library-musketeers';
import Image from 'next/image';
import { MouseEvent } from 'react';

type MumbleInlineHeaderProps = {
  displayName: string;
  userName: string;
  avatarUrl: string;
  timeStamp: string;
  onClickUserName: (e: MouseEvent<Element>) => void;
};

function MumbleInlineHeader({ displayName, userName, avatarUrl, timeStamp, onClickUserName }: MumbleInlineHeaderProps) {
  return (
    <div className={'flex items-center mb-s'}>
      <div>
        <Avatar
          alt="Display Name @displayName"
          showBorder
          size={AvatarSize.S}
          imageElementType={Image}
          imageComponentProps={{ width: '480', height: '480' }}
          src={avatarUrl}
        />
      </div>
      <div className={'flex flex-col ml-xs'}>
        <div className="label-m text-slate-900 mb-xxs">{displayName}</div>
        <div className="flex gap-s">
          <IconLink type={IconLinkType.VIOLET} label={userName} href="" target="" onClick={onClickUserName}>
            <Profile />
          </IconLink>
          <IconLink type={IconLinkType.DEFAULT} label={timeStamp} href="" target="" onClick={() => undefined}>
            <Time />
          </IconLink>
        </div>
      </div>
    </div>
  );
}

export default MumbleInlineHeader;
