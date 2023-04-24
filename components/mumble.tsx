import { QwackModelDecorated } from '../models/qwacker.model';
import { getFormattedTimestamp, parseHashtags } from '../helpers/common.helpers';
import {
  Avatar,
  AvatarSize,
  Hashtag,
  HashtagSize,
  IconLink,
  IconLinkType,
  Profile,
  Time,
} from '@smartive-education/design-system-component-library-musketeers';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getUserId } from '../helpers/session.helpers';
import CommentInteraction from './comment-interaction';
import LikeInteraction from './like-interaction';
import CopyInteraction from './copy-interaction';
import DeleteInteraction from './delete-interaction';

type MumbleProps = {
  mumbleData: QwackModelDecorated;
  avatarUrl: string;
  children?: JSX.Element;
  isInline?: boolean;
  onDeleteCallback?: () => void;
};

type MumbleHeaderProps = {
  isInline?: boolean;
  displayName: string;
  userName: string;
  avatarUrl: string;
  timeStamp: string;
  creator: string;
};

type MumbleHeaderLinksProps = {
  userName: string;
  timeStamp: string;
  creator: string;
};

type MumbleContentProps = {
  text: string;
  mediaUrl: string | null;
};

type MumbleFooterProps = {
  mumbleData: QwackModelDecorated;
  onDeleteCallback?: () => void;
};

function Mumble({ mumbleData, avatarUrl, isInline, children, onDeleteCallback }: MumbleProps) {
  return (
    <div className="relative">
      <MumbleHeader
        isInline={isInline}
        displayName={mumbleData.creatorData.firstName + ' ' + mumbleData.creatorData.lastName}
        userName={mumbleData.creatorData.userName}
        avatarUrl={avatarUrl}
        timeStamp={getFormattedTimestamp(mumbleData.id)}
        creator={mumbleData.creator}
      ></MumbleHeader>
      <MumbleContent text={mumbleData.text} mediaUrl={mumbleData.mediaUrl ? mumbleData.mediaUrl : null}></MumbleContent>
      <MumbleFooter mumbleData={mumbleData} onDeleteCallback={onDeleteCallback}></MumbleFooter>
      {children}
    </div>
  );
}

function MumbleHeaderLinks({ userName, timeStamp, creator }: MumbleHeaderLinksProps) {
  return (
    <>
      <IconLink
        type={IconLinkType.VIOLET}
        label={userName}
        href={`/profile/${creator}`}
        target="_self"
        onClick={() => undefined}
      >
        <Profile />
      </IconLink>
      <IconLink type={IconLinkType.DEFAULT} label={timeStamp} target="_self" onClick={() => undefined}>
        <Time />
      </IconLink>
    </>
  );
}

function MumbleHeader({ isInline, displayName, userName, avatarUrl, timeStamp, creator }: MumbleHeaderProps) {
  return isInline ? (
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
          <MumbleHeaderLinks userName={userName} timeStamp={timeStamp} creator={creator} />
        </div>
      </div>
    </div>
  ) : (
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
        <MumbleHeaderLinks userName={userName} timeStamp={timeStamp} creator={creator} />
      </div>
    </>
  );
}

function MumbleContent({ text, mediaUrl }: MumbleContentProps) {
  const router = useRouter();

  return (
    <div className="paragraph-s text-slate-900 grid gap-m">
      <div className={'pt-m'}>
        <div className={'break-all'}>{text}</div>
        <div className="block md:flex md:gap-xs">
          {parseHashtags(text).map((hashtag: string) => (
            <Hashtag
              key={hashtag}
              size={HashtagSize.M}
              label={hashtag}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                router.push(`/results/${hashtag}`);
              }}
            />
          ))}
        </div>
        {mediaUrl && (
          <div className={'mt-s'}>
            <Image width={640} height={480} alt="" className="block rounded-default" src={mediaUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

function MumbleFooter({ mumbleData, onDeleteCallback }: MumbleFooterProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = getUserId(session);

  return (
    <div className="pt-s flex gap-s">
      <div className="block md:flex">
        {mumbleData.type !== 'reply' && (
          <CommentInteraction
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              router.push(`/mumble/${mumbleData.id}`);
            }}
            initialCount={mumbleData.replyCount}
          />
        )}
        <LikeInteraction initialCount={mumbleData.likeCount} likedByUser={mumbleData.likedByUser} postId={mumbleData.id} />
        <CopyInteraction postId={mumbleData.id} />
        {userId === mumbleData.creator && (
          <DeleteInteraction
            postId={mumbleData.id}
            label={mumbleData.type === 'reply' ? 'Delete Comment' : 'Delete Mumble'}
            onDeleteCallback={onDeleteCallback}
          />
        )}
      </div>
    </div>
  );
}

export default Mumble;
