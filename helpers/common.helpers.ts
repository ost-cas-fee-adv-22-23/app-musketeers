const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'; // Crockford's Base32
const ENCODING_LEN = ENCODING.length;
const TIME_LEN = 10;

export const parseHashtags = (text: string) => {
  const matches = text.match(/#(\w+)/g);
  if (matches) {
    return matches.map((match) => match.replace('#', ''));
  }
  return [];
};

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
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};
