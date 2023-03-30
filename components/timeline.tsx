import {
  Avatar,
  AvatarSize,
  Interaction,
  InteractionType,
  Share,
  Hashtag,
  HashtagSize,
} from '@smartive-education/design-system-component-library-musketeers';
import Mumble from './mumble';
import Image from 'next/image';
import CommentInteraction from './comment-interaction';
import LikeInteraction from './like-interaction';
import { QwackModelDecorated } from '../models/qwacker.model';
import { parseHashtags } from '../helpers/common.helpers';

const onClickTimestampHandler = () => {
  console.log('onClickTimestampHandler');
};
const onClickUserNameHandler = () => {
  console.log('onClickUserNameHandler');
};

type TimeLineProps = {
  posts: QwackModelDecorated[];
};

function Timeline(props: TimeLineProps) {
  return (
    <>
      {props.posts &&
        props.posts.map((mumble) => (
          <div key={mumble.id} className="mb-s">
            <Mumble
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
              displayName={`${mumble.creatorData.firstName} ${mumble.creatorData.lastName}`}
              footer={
                <div className="grid grid-cols-1 md:grid-cols-3 gap-xs">
                  <CommentInteraction initialCount={mumble.replyCount} />
                  <LikeInteraction initialCount={mumble.likeCount} />
                  <Interaction onClick={(event) => event} type={InteractionType.DEFAULT}>
                    <Share />
                    Copy link
                  </Interaction>
                </div>
              }
              onClickTimestamp={onClickTimestampHandler}
              onClickUserName={onClickUserNameHandler}
              timestamp="timestamp"
              userName={mumble.creatorData.userName}
            >
              <>
                <div>{mumble.text}</div>
                <div className="flex gap-xs">
                  {parseHashtags(mumble.text).map((hashtag: string) => (
                    <Hashtag key={hashtag} size={HashtagSize.M} label={hashtag} onClick={(event) => event} />
                  ))}
                </div>
                {mumble.mediaUrl && (
                  <Image width={640} height={480} alt="" className="block rounded-default" src={mumble.mediaUrl} />
                )}
              </>
            </Mumble>
          </div>
        ))}
    </>
  );
}

export default Timeline;
