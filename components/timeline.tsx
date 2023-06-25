import { Card, CardSize } from '@smartive-education/design-system-component-library-musketeers';
import Mumble from './mumble';
import { QwackModelDecorated } from '../models/qwacker.model';
import { PROFILE_IMG_URL } from '../constants/qwacker.constants';
import { useRouter } from 'next/router';

type TimeLineProps = {
  posts: QwackModelDecorated[];
  onDeleteCallback?: () => void;
};

function Timeline(props: TimeLineProps) {
  const router = useRouter();

  return (
    <>
      {props.posts && props.posts.length > 0 ? (
        props.posts.map((mumble) => (
          <div
            key={mumble.id}
            className="mb-s cursor-pointer"
            onClick={() => router.push(`/mumble/${mumble.id}`)}
            data-testid={'mumble'}
          >
            <Card size={CardSize.XL} hasRoundBorders={true}>
              <Mumble
                mumbleData={mumble}
                avatarUrl={PROFILE_IMG_URL + mumble.creator}
                onDeleteCallback={props.onDeleteCallback}
              ></Mumble>
            </Card>
          </div>
        ))
      ) : (
        <div className={'text-center text-violet-400'} data-testid="timeline-no-data">
          Currently there are no posts available
        </div>
      )}
    </>
  );
}

export default Timeline;
