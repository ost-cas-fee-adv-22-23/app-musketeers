import React, { useState } from 'react';
import {
  Interaction,
  InteractionType,
  Reply,
  ReplyFilled,
} from '@smartive-education/design-system-component-library-musketeers';

type CommentInteractionProps = {
  initialCount: number;
};

function CommentInteraction(props: CommentInteractionProps) {
  const [comments, setComments] = useState(props.initialCount ?? 0);

  return (
    <Interaction type={InteractionType.VIOLET} active={comments > 0} onClick={() => setComments((comments) => comments + 1)}>
      {comments > 0 ? <ReplyFilled /> : <Reply />}
      {comments > 0 ? `${comments} Comments` : 'Comment'}
    </Interaction>
  );
}

export default CommentInteraction;
