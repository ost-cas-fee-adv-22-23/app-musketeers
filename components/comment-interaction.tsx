import React from 'react';
import {
  Interaction,
  InteractionType,
  Reply,
  ReplyFilled,
} from '@smartive-education/design-system-component-library-musketeers';

type CommentInteractionProps = {
  initialCount: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function CommentInteraction(props: CommentInteractionProps) {
  const comments = props.initialCount;

  return (
    <Interaction type={InteractionType.VIOLET} active={comments > 0} onClick={props.onClick}>
      {comments > 0 ? <ReplyFilled /> : <Reply />}
      {comments > 0 ? `${comments} Comments` : 'Comment'}
    </Interaction>
  );
}

export default CommentInteraction;
