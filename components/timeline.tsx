import {
  Avatar,
  AvatarSize,
  Card,
  CardSize,
  Hashtag,
  HashtagSize,
  Interaction,
  InteractionType,
  Share,
} from '@smartive-education/design-system-component-library-musketeers';
import Mumble from './mumble';
import Image from 'next/image';
import CommentInteraction from './comment-interaction';
import LikeInteraction from './like-interaction';
import { QwackModelDecorated } from '../models/qwacker.model';
import { getFormattedTimestamp, parseHashtags } from '../helpers/common.helpers';
import { useRouter } from 'next/router';

const onClickTimestampHandler = () => {
  console.log('onClickTimestampHandler');
};

type TimeLineProps = {
  posts: QwackModelDecorated[];
};

function Timeline(props: TimeLineProps) {
  const router = useRouter();

  return (
    <>
      {props.posts &&
        props.posts.map((mumble) => (
          <div key={mumble.id} className="mb-s">
            <Card size={CardSize.XL} hasRoundBorders={true}>
              <Mumble
                avatar={
                  <Avatar
                    alt="Display Name @displayName"
                    showBorder
                    size={AvatarSize.M}
                    imageElementType={Image}
                    imageComponentProps={{ width: '480', height: '480' }}
                    src={'https://picsum.photos/160/160?random=' + mumble.creator}
                  />
                }
                displayName={`${mumble.creatorData.firstName} ${mumble.creatorData.lastName}`}
                footer={
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-xs">
                    <CommentInteraction
                      onClick={(event) => {
                        event.preventDefault();
                        router.push('/mumble/' + mumble.id);
                      }}
                      initialCount={mumble.replyCount}
                    />
                    <LikeInteraction initialCount={mumble.likeCount} likedByUser={mumble.likedByUser} postId={mumble.id} />
                    <Interaction onClick={(event) => event} type={InteractionType.DEFAULT}>
                      <Share />
                      Copy link
                    </Interaction>
                  </div>
                }
                onClickTimestamp={onClickTimestampHandler}
                onClickUserName={(e) => {
                  e.preventDefault();
                  router.push(`/profile/${mumble.creator}`);
                }}
                timestamp={getFormattedTimestamp(mumble.id)}
                userName={mumble.creatorData.userName}
                mumble={
                  <div className={'pt-s'}>
                    <div>{mumble.text}</div>
                    <div className="flex gap-xs">
                      {parseHashtags(mumble.text).map((hashtag: string) => (
                        <Hashtag key={hashtag} size={HashtagSize.M} label={hashtag} onClick={(event) => event} />
                      ))}
                    </div>
                    {mumble.mediaUrl && (
                      <div className={'mt-s'}>
                        <Image width={640} height={480} alt="" className="block rounded-default" src={mumble.mediaUrl} />
                      </div>
                    )}
                  </div>
                }
              ></Mumble>
            </Card>
          </div>
        ))}
    </>
  );
}

export default Timeline;
