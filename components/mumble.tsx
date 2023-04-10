import {
  Avatar,
  AvatarSize,
  Hashtag,
  HashtagSize,
  IconLink,
  IconLinkType,
  Interaction,
  InteractionType,
  Profile,
  Share,
  Time,
} from '@smartive-education/design-system-component-library-musketeers';
import { MouseEvent } from 'react';
import Image from 'next/image';
import CommentInteraction from './comment-interaction';
import LikeInteraction from './like-interaction';
import { useRouter } from 'next/router';
import { QwackModelDecorated } from '../models/qwacker.model';
import { getFormattedTimestamp, parseHashtags } from '../helpers/common.helpers';

type MumbleProps = {
  mumbleData: QwackModelDecorated;
  avatarUrl: string;
  onClickUserName: (e: MouseEvent<Element>) => void;
  onClickTimestamp: (e: MouseEvent<Element>) => void;
  children?: JSX.Element;
  isInline?: boolean;
};

function Mumble({ mumbleData, avatarUrl, onClickUserName, onClickTimestamp, isInline, children }: MumbleProps) {
  const router = useRouter();

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xs">
          <CommentInteraction
            onClick={(event) => {
              event.preventDefault();
              router.push('/mumble/' + mumbleData.id);
            }}
            initialCount={mumbleData.replyCount}
          />
          <LikeInteraction initialCount={mumbleData.likeCount} likedByUser={mumbleData.likedByUser} postId={mumbleData.id} />
          <Interaction onClick={(event) => event} type={InteractionType.DEFAULT}>
            <Share />
            Copy link
          </Interaction>
        </div>
      </div>

      {children}
    </div>
  );
}

export default Mumble;
