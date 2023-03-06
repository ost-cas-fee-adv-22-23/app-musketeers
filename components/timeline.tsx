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

const onClickTimestampHandler = () => {
  console.log('onClickTimestampHandler');
};
const onClickUserNameHandler = () => {
  console.log('onClickUserNameHandler');
};

function Timeline() {
  return (
    <>
      {/* TODO: Add loop for mumbles, when data is available */}
      {[
        { id: 0, title: 'Foo' },
        { id: 1, title: 'Bar' },
        { id: 2, title: 'Baz' },
      ].map((mumble) => (
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
            displayName="Hans Muster"
            footer={
              <>
                <CommentInteraction />
                <LikeInteraction />
                <Interaction onClick={(event) => event} type={InteractionType.DEFAULT}>
                  <Share />
                  Copy link
                </Interaction>
              </>
            }
            onClickTimestamp={onClickTimestampHandler}
            onClickUserName={onClickUserNameHandler}
            timestamp="timestamp"
            userName="hansmuster"
          >
            <>
              <div>
                Sed at eleifend erat. Ut mattis malesuada tristique. Aliquam eget ultricies ipsum. Quisque rutrum orci non
                risus dignissim, a semper tortor ultricies. Nam commodo lacus mi, molestie malesuada mi scelerisque eu.
                Aenean et pellentesque lectus, in iaculis sem. In ac efficitur lectus. Quisque consectetur est libero, eu
                sagittis magna vestibulum a. Etiam consectetur lobortis ipsum et bibendum. Maecenas id purus quam.
              </div>
              <div className="flex gap-xs">
                <Hashtag size={HashtagSize.M} label="myhashtag" onClick={(event) => event} />
                <Hashtag size={HashtagSize.M} label="myhashtag2" onClick={(event) => event} />
              </div>
              <Image
                width={640}
                height={480}
                alt=""
                className="block rounded-default"
                src="https://randompicturegenerator.com/img/people-generator/gd121f56d8674f28d00ce9f1c44686e7a9bee58b8d33a3c57daaada1fa493c214290f9490833d1ff18f4ee16cd5298e1f_640.jpg"
              />
            </>
          </Mumble>
        </div>
      ))}
    </>
  );
}

export default Timeline;
