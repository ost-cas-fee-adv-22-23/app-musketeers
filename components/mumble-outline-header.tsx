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

type MumbleOutlineHeaderProps = {
  displayName: string;
  userName: string;
  avatarUrl: string;
  timeStamp: string;
  onClickUserName: (e: MouseEvent<Element>) => void;
};

function MumbleOutlineHeader({ displayName, userName, avatarUrl, timeStamp, onClickUserName }: MumbleOutlineHeaderProps) {
  return (
    <>
      <div className="absolute -top-s -left-[80px] hidden sm:block">
        <Avatar
          alt="Display Name @displayName"
          showBorder
          size={AvatarSize.M}
          imageElementType={Image}
          imageComponentProps={{ width: '480', height: '480' }}
          src={avatarUrl}
        />
      </div>
      <div className="label-l text-slate-900 mb-xxs">{displayName}</div>
      <div className="flex gap-s">
        <IconLink type={IconLinkType.VIOLET} label={userName} href="" target="" onClick={onClickUserName}>
          <Profile />
        </IconLink>
        <IconLink type={IconLinkType.DEFAULT} label={timeStamp} href="" target="" onClick={() => undefined}>
          <Time />
        </IconLink>
      </div>
    </>
  );
}

export default MumbleOutlineHeader;
