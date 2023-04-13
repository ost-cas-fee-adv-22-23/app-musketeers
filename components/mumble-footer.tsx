import CommentInteraction from './comment-interaction';
import LikeInteraction from './like-interaction';
import CopyInteraction from './copy-interaction';
import DeleteInteraction from './delete-interaction';
import { QwackModelDecorated } from '../models/qwacker.model';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getUserId } from '../helpers/session.helpers';

type MumbleFooterProps = {
  mumbleData: QwackModelDecorated;
  onDeleteCallback?: () => void;
};

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

export default MumbleFooter;
