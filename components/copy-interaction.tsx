import React, { useState } from 'react';
import { Interaction, InteractionType, Share } from '@smartive-education/design-system-component-library-musketeers';

type CopyInteractionProps = {
  postId: string;
};

function CopyInteraction({ postId }: CopyInteractionProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(`${location.protocol}//${location.host}/mumble/${postId}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Interaction onClick={handleCopy} type={InteractionType.DEFAULT}>
      <Share />
      {isCopied ? <span className="pl-xs">Link copied</span> : <span className="pl-xs">Copy link</span>}
    </Interaction>
  );
}

export default CopyInteraction;
