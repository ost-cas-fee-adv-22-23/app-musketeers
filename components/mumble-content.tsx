import { parseHashtags } from '../helpers/common.helpers';
import { Hashtag, HashtagSize } from '@smartive-education/design-system-component-library-musketeers';
import Image from 'next/image';
import { useRouter } from 'next/router';

type MumbleContentProps = {
  text: string;
  mediaUrl: string | null;
};

function MumbleContent({ text, mediaUrl }: MumbleContentProps) {
  const router = useRouter();

  return (
    <div className="paragraph-s text-slate-900 grid gap-m">
      <div className={'pt-m'}>
        <div className={'break-all'}>{text}</div>
        <div className="block md:flex md:gap-xs">
          {parseHashtags(text).map((hashtag: string) => (
            <Hashtag
              key={hashtag}
              size={HashtagSize.M}
              label={hashtag}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                router.push(`/results/${hashtag}`);
              }}
            />
          ))}
        </div>
        {mediaUrl && (
          <div className={'mt-s'}>
            <Image width={640} height={480} alt="" className="block rounded-default" src={mediaUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MumbleContent;
