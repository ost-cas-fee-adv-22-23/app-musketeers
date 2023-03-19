import React, { useState } from 'react';
import {
  Interaction,
  InteractionType,
  Heart,
  HeartFilled,
} from '@smartive-education/design-system-component-library-musketeers';

interface LikeInteractionProps {
  initialCount: number;
}

function LikeInteraction(props: LikeInteractionProps) {
  const [likes, setLikes] = useState(props.initialCount ?? 0);

  return (
    <Interaction type={InteractionType.PINK} active={likes > 0} onClick={() => setLikes((likes) => likes + 1)}>
      {likes > 0 ? <HeartFilled /> : <Heart />}
      {likes > 0 ? `${likes} Likes` : 'Like'}
    </Interaction>
  );
}

export default LikeInteraction;
