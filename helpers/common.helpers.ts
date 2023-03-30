export const parseHashtags = (text: string) => {
  const matches = text.match(/#(\w+)/g);
  if (matches) {
    return matches.map((match) => match.replace('#', ''));
  }
  return [];
};
