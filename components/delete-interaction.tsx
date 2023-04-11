import React from 'react';
import {
  Interaction,
  InteractionType,
  Cancel as CancelSvg,
} from '@smartive-education/design-system-component-library-musketeers';
import { destroyPost } from '../services/qwacker.service';
import { useSession } from 'next-auth/react';
import { getClientToken } from '../helpers/session.helpers';

type DeleteInteractionProps = {
  postId: string;
  onDeleteCallback?: () => void;
};

function DeleteInteraction({ postId, onDeleteCallback }: DeleteInteractionProps) {
  const { data: session } = useSession();
  const token = getClientToken(session);

  const handleDelete = async () => {
    try {
      await destroyPost({
        token,
        id: postId,
      });
      onDeleteCallback && onDeleteCallback();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Interaction type={InteractionType.PINK} onClick={handleDelete}>
      <CancelSvg />
      Delete Post
    </Interaction>
  );
}

export default DeleteInteraction;
