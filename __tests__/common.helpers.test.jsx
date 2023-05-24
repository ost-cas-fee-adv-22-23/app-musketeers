import { parseHashtags, getFormattedTimestamp } from '../helpers/common.helpers';

describe('common.helpers', () => {
  test('parseHashtags', () => {
    expect(parseHashtags('lorem #hashtag ipsum')).toStrictEqual(['hashtag']);
    expect(parseHashtags('')).toStrictEqual([]);
    expect(parseHashtags(undefined)).toStrictEqual([]);
    expect(parseHashtags()).toStrictEqual([]);
  });

  test('getFormattedTimestamp', () => {
    expect(getFormattedTimestamp('01H0DFJQEVHP3MVZP567X9M5EF')).toStrictEqual('vor 10 Tage');
    expect(getFormattedTimestamp('01GZEDADXG5ACPFRZ45VGN0Q17')).toStrictEqual('vor 22 Tage');
    expect(getFormattedTimestamp()).toStrictEqual('');
    expect(getFormattedTimestamp(undefined)).toStrictEqual('');
    expect(getFormattedTimestamp('')).toStrictEqual('');
  });
});
