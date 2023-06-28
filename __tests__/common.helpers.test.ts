import { renderHook, fireEvent } from '@testing-library/react';
import humanizeDuration from '../__mocks__/humanize-duration';
import { getFormattedTimestamp, parseHashtags, useContainerDimensions } from '../helpers/common.helpers'; // Replace 'your-module' with the actual module path
import { RefObject } from 'react';

jest.mock('humanize-duration');

describe('parseHashtags', () => {
  test('should return an empty array if no hashtags are found', () => {
    const text = 'This is a sample text without hashtags';
    const hashtags = parseHashtags(text);
    expect(hashtags).toEqual([]);
  });

  test('should return an array of hashtags', () => {
    const text = 'This is a #sample text with #hashtags';
    const hashtags = parseHashtags(text);
    expect(hashtags).toEqual(['sample', 'hashtags']);
  });
});

describe('getFormattedTimestamp', () => {
  test('should return the formatted timestamp string', () => {
    const id = 'ABCDEF1234';
    const humanizeDurationMock = jest.fn().mockReturnValue('1d');
    humanizeDuration.mockImplementationOnce(humanizeDurationMock);

    const formattedTimestamp = getFormattedTimestamp(id);

    expect(humanizeDurationMock).toHaveBeenCalledWith(expect.any(Number), {
      language: 'de',
      round: true,
      units: ['y', 'd', 'h', 'm'],
      largest: 1,
    });
    expect(formattedTimestamp).toBe('vor 1d');
  });
});

describe('useContainerDimensions', () => {
  test('should update dimensions when containerElement changes', () => {
    const containerElement1 = { current: { offsetWidth: 200, offsetHeight: 100 } };
    const containerElement2 = { current: { offsetWidth: 300, offsetHeight: 150 } };

    const { result, rerender } = renderHook(
      (containerElement) => useContainerDimensions(containerElement as RefObject<HTMLDivElement>),
      {
        initialProps: containerElement1,
      }
    );

    expect(result.current).toEqual({ width: 200, height: 100 });

    rerender(containerElement2);

    expect(result.current).toEqual({ width: 300, height: 150 });
  });

  test('should return initial dimensions if containerElement is null', () => {
    const containerElement = { current: null };

    const { result } = renderHook((containerElement) => useContainerDimensions(containerElement), {
      initialProps: containerElement,
    });

    expect(result.current).toEqual({ width: 0, height: 0 });
  });
});
