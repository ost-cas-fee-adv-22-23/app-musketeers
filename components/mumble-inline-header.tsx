import {
  Avatar,
  AvatarSize,
  IconLink,
  IconLinkType,
  Profile,
  Time,
} from '@smartive-education/design-system-component-library-musketeers';
import Image from 'next/image';

type MumbleInlineHeaderProps = {
  displayName: string;
  userName: string;
  avatarUrl: string;
  timeStamp: string;
  creator: string;
};

function MumbleInlineHeader({ displayName, userName, avatarUrl, timeStamp, creator }: MumbleInlineHeaderProps) {
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
          <IconLink
            type={IconLinkType.VIOLET}
            label={userName}
            href={`/profile/${creator}`}
            target="_self"
            onClick={() => undefined}
          >
            <Profile />
          </IconLink>
          <IconLink
            type={IconLinkType.DEFAULT}
            label={timeStamp}
            href={`/profile/${creator}`}
            target="_self"
            onClick={() => undefined}
          >
            <Time />
          </IconLink>
        </div>
      </div>
    </div>
  );
}

export default MumbleInlineHeader;
