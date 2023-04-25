import humanizeDuration from 'humanize-duration';
import { RefObject, useEffect, useState } from 'react';

const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32
const ENCODING_LEN = ENCODING.length;
const TIME_LEN = 10;

export const parseHashtags = (text: string) => {
  const matches = text?.match(/#(\w+)/g);
  if (matches) {
    return matches.map((match) => match.replace('#', ''));
  }
  return [];
};

// METHOD COPIED FROM https://github.com/ulid/javascript/blob/master/lib/index.ts#L97
// GETS TIMESTAMP FROM ID
const getTimestampFromId = (id: string) => {
  return id
    .substr(0, TIME_LEN)
    .split('')
    .reverse()
    .reduce((carry, char, index) => {
      const encodingIndex = ENCODING.indexOf(char);
      return carry + encodingIndex * Math.pow(ENCODING_LEN, index);
    }, 0);
};

export const getFormattedTimestamp = (id: string): string => {
  const date = new Date(getTimestampFromId(id));
  const dateAgeHumanized = humanizeDuration(new Date().getTime() - date.getTime(), {
    language: 'de',
    round: true,
    units: ['y', 'd', 'h', 'm'],
    largest: 1,
  });
  return `vor ${dateAgeHumanized}`;
};

export const useContainerDimensions = (containerElement: RefObject<HTMLDivElement>) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: containerElement?.current?.offsetWidth ? containerElement?.current?.offsetWidth : 0,
      height: containerElement?.current?.offsetHeight ? containerElement?.current?.offsetHeight : 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (containerElement.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerElement]);

  return dimensions;
};
