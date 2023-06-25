import { render, screen } from '@testing-library/react';
import Timeline from '../components/timeline';
import '../__mocks__/intersectionObserverMock';

describe('Timeline', () => {
  it('Renders the Timeline Component and Mumble items according to data', () => {
    render(
      <Timeline
        posts={[
          {
            id: '1',
            creator: '111',
            text: 'Test Text',
            mediaUrl: '',
            mediaType: 'image/jpeg',
            likeCount: 2,
            likedByUser: true,
            type: 'post',
            replyCount: 0,
            creatorData: {
              id: '111',
              userName: 'userName1',
              firstName: 'firstName1',
              lastName: 'lastName1',
              avatarUrl: '',
            },
          },
          {
            id: '2',
            creator: '222',
            text: 'Test Text',
            mediaUrl: '',
            mediaType: 'image/jpeg',
            likeCount: 2,
            likedByUser: true,
            type: 'post',
            replyCount: 0,
            creatorData: {
              id: '222',
              userName: 'userName2',
              firstName: 'firstName2',
              lastName: 'lastName2',
              avatarUrl: '',
            },
          },
          {
            id: '33',
            creator: '333',
            text: 'Test Text',
            mediaUrl: '',
            mediaType: 'image/jpeg',
            likeCount: 2,
            likedByUser: true,
            type: 'post',
            replyCount: 0,
            creatorData: {
              id: '333',
              userName: 'userName3',
              firstName: 'firstName3',
              lastName: 'lastName3',
              avatarUrl: '',
            },
          },
        ]}
        onDeleteCallback={(event) => event}
      />
    );

    const displayNames = screen.getAllByTestId('mumble');
    expect(displayNames).toHaveLength(3);
    const noData = screen.queryByTestId('timeline-no-data');
    expect(noData).not.toBeInTheDocument();
  });
  it('Renders the Timeline with no data', () => {
    render(<Timeline posts={[]} onDeleteCallback={(event) => event} />);

    const displayNames = screen.queryByTestId('mumble');
    expect(displayNames).not.toBeInTheDocument();
    const noData = screen.queryByTestId('timeline-no-data');
    expect(noData).toBeInTheDocument();
  });
});
