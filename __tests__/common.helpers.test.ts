import { parseHashtags, getFormattedTimestamp } from '../helpers/common.helpers';

describe('common.helpers', () => {
  test('parseHashtags', () => {
    expect(parseHashtags('lorem #hashtag ipsum')).toStrictEqual(['hashtag']);
    expect(parseHashtags('')).toStrictEqual([]);
  });

  //TODO: Yeah well, this is not working yet. I need to mock the date somehow. ;)
  // test('getFormattedTimestamp', () => {
  //   expect(getFormattedTimestamp('01H0DFJQEVHP3MVZP567X9M5EF')).toStrictEqual('vor 10 Tage');
  //   expect(getFormattedTimestamp('01GZEDADXG5ACPFRZ45VGN0Q17')).toStrictEqual('vor 22 Tage');
  //   expect(getFormattedTimestamp('')).toStrictEqual('');
  // });
});