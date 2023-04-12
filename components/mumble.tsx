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
import { MouseEvent } from 'react';
import Image from 'next/image';
import CommentInteraction from './comment-interaction';
import LikeInteraction from './like-interaction';
import CopyInteraction from './copy-interaction';
import DeleteInteraction from './delete-interaction';
import { useRouter } from 'next/router';
import { QwackModelDecorated } from '../models/qwacker.model';
import { getFormattedTimestamp, parseHashtags } from '../helpers/common.helpers';
import { useSession } from 'next-auth/react';
import { getUserId } from '../helpers/session.helpers';

type MumbleProps = {
  mumbleData: QwackModelDecorated;
  avatarUrl: string;
  onClickUserName: (e: MouseEvent<Element>) => void;
  onClickTimestamp: (e: MouseEvent<Element>) => void;
  children?: JSX.Element;
  isInline?: boolean;
  onDeleteCallback?: () => void;
};

function Mumble({
  mumbleData,
  avatarUrl,
  onClickUserName,
  onClickTimestamp,
  isInline,
  children,
  onDeleteCallback,
}: MumbleProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = getUserId(session);

  return (
    <div className="relative">
      {isInline ? (
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
            <div className="label-m text-slate-900 mb-xxs">
              {mumbleData.creatorData.firstName} {mumbleData.creatorData.lastName}
            </div>
            <div className="flex gap-s">
              <IconLink
                type={IconLinkType.VIOLET}
                label={mumbleData.creatorData.userName}
                href=""
                target=""
                onClick={onClickUserName}
              >
                <Profile />
              </IconLink>
              <IconLink
                type={IconLinkType.DEFAULT}
                label={getFormattedTimestamp(mumbleData.id)}
                href=""
                target=""
                onClick={onClickTimestamp}
              >
                <Time />
              </IconLink>
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
          <div className="label-l text-slate-900 mb-xxs">
            {mumbleData.creatorData.firstName} {mumbleData.creatorData.lastName}
          </div>
          <div className="flex gap-s">
            <IconLink
              type={IconLinkType.VIOLET}
              label={mumbleData.creatorData.userName}
              href=""
              target=""
              onClick={onClickUserName}
            >
              <Profile />
            </IconLink>
            <IconLink
              type={IconLinkType.DEFAULT}
              label={getFormattedTimestamp(mumbleData.id)}
              href=""
              target=""
              onClick={onClickTimestamp}
            >
              <Time />
            </IconLink>
          </div>
        </>
      )}
      <div className="paragraph-s text-slate-900 grid gap-m">
        <div className={'pt-m'}>
          <div>{mumbleData.text}</div>
          <div className="flex gap-xs">
            {parseHashtags(mumbleData.text).map((hashtag: string) => (
              <Hashtag key={hashtag} size={HashtagSize.M} label={hashtag} onClick={(event) => event} />
            ))}
          </div>
          {mumbleData.mediaUrl && (
            <div className={'mt-s'}>
              <Image width={640} height={480} alt="" className="block rounded-default" src={mumbleData.mediaUrl} />
            </div>
          )}
        </div>
      </div>
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
      {children}
    </div>
  );
}

export default Mumble;
