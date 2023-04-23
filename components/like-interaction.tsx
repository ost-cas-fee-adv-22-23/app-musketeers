import React, { useReducer, MouseEvent } from 'react';
import {
  Interaction,
  InteractionType,
  Heart,
  HeartFilled,
} from '@smartive-education/design-system-component-library-musketeers';
import { updateLikes, destroyLikes } from '../services/likes.service';
import { useSession } from 'next-auth/react';
import { getClientToken } from '../helpers/session.helpers';
import { toast } from 'react-toastify';

type LikeInteractionProps = {
  initialCount: number;
  likedByUser: boolean;
  postId: string;
};

function LikeInteraction({ initialCount, likedByUser, postId }: LikeInteractionProps) {
  const { data: session } = useSession();
  const token = getClientToken(session);
  const reducer = (state: { likes: number; liked: boolean }, action: { type: 'addLike' | 'removeLike' }) => {
    switch (action.type) {
      case 'addLike': {
        return {
          likes: state.likes + 1,
          liked: true,
        };
      }
      case 'removeLike': {
        return {
          likes: state.likes - 1,
          liked: false,
        };
      }
    }
    throw Error('Unknown action: ' + action.type);
  };
  const [state, dispatch] = useReducer(reducer, { likes: initialCount || 0, liked: likedByUser || false });

  const handleAddLike = async () => {
    dispatch({
      type: 'addLike',
    });
    try {
      await updateLikes({
        token,
        id: postId,
      });
    } catch (error) {
      toast.error('Sorry something went wront please try again');
      console.log(error);
      dispatch({
        type: 'removeLike',
      });
    }
  };

  const handleRemoveLike = async () => {
    dispatch({
      type: 'removeLike',
    });
    try {
      await destroyLikes({
        token,
        id: postId,
      });
    } catch (error) {
      toast.error('Sorry something went wront please try again');
      console.log(error);
      dispatch({
        type: 'addLike',
      });
    }
  };

  const likeHandler = async (event: MouseEvent<Element>) => {
    event.preventDefault();
    event.stopPropagation();
    if (state.liked) {
      await handleRemoveLike();
    } else {
      await handleAddLike();
    }
  };

  return (
    <Interaction type={InteractionType.PINK} active={state.likes > 0} onClick={likeHandler}>
      {state.liked ? <HeartFilled /> : <Heart />}
      {state.likes > 0 ? `${state.likes} Likes` : 'Like'}
    </Interaction>
  );
}

export default LikeInteraction;
