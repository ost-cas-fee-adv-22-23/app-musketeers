import React, { useState } from 'react';
import {
  Interaction,
  InteractionType,
  Heart,
  HeartFilled,
} from '@smartive-education/design-system-component-library-musketeers';
import { updateLikes, destroyLikes } from '../services/qwacker.service';
import { useSession } from 'next-auth/react';
import { getClientToken } from '../helpers/getClientToken';

type LikeInteractionProps = {
  initialCount: number;
  likedByUser: boolean;
  postId: string;
};

function LikeInteraction({ initialCount, likedByUser, postId }: LikeInteractionProps) {
  const { data: session } = useSession();
  const token = getClientToken(session);
  const [likes, setLikes] = useState(initialCount ?? 0);
  const [liked, setLiked] = useState(likedByUser ?? false);

  const addLike = async () => {
    setLikes((likes) => likes + 1);
    setLiked(true);
    try {
      await updateLikes({
        token,
        postId,
      });
    } catch (error) {
      console.log(error);
      setLikes((likes) => likes - 1);
      setLiked(false);
    }
  };
  const removeLike = async () => {
    setLikes((likes) => likes - 1);
    setLiked(false);
    try {
      await destroyLikes({
        token,
        postId,
      });
    } catch (error) {
      console.log(error);
      setLikes((likes) => likes + 1);
      setLiked(true);
    }
  };

  const likeHandler = async () => {
    if (likedByUser) {
      removeLike();
    } else {
      addLike();
    }
  };

  return (
    <Interaction type={InteractionType.PINK} active={likes > 0} onClick={likeHandler}>
      {liked ? <HeartFilled /> : <Heart />}
      {likes > 0 ? `${likes} Likes` : 'Like'}
    </Interaction>
  );
}

export default LikeInteraction;
