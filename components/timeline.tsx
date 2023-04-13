import { Card, CardSize } from '@smartive-education/design-system-component-library-musketeers';
import Mumble from './mumble';
import { QwackModelDecorated } from '../models/qwacker.model';
import { useRouter } from 'next/router';

const onClickTimestampHandler = () => {
  console.log('onClickTimestampHandler');
};

type TimeLineProps = {
  posts: QwackModelDecorated[];
  onDeleteCallback?: () => void;
};

function Timeline(props: TimeLineProps) {
  const router = useRouter();

  return (
    <>
      {props.posts &&
        props.posts.map((mumble) => (
          <div
            key={mumble.id}
            className="mb-s"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              //TODO CHECK HOW SOLVE THIS CLICK MISSMATCH SINCE THIS IS THE PARENT
              //router.push(`/mumble/${mumble.id}`);
            }}
          >
            <Card size={CardSize.XL} hasRoundBorders={true}>
              <Mumble
                mumbleData={mumble}
                avatarUrl={'https://picsum.photos/160/160?random=' + mumble.creator}
                onClickTimestamp={onClickTimestampHandler}
                onClickUserName={(event) => {
                  event.preventDefault();
                  router.push(`/profile/${mumble.creator}`);
                }}
                onDeleteCallback={props.onDeleteCallback}
              ></Mumble>
            </Card>
          </div>
        ))}
    </>
  );
}

export default Timeline;
