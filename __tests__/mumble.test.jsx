import { render, screen } from '@testing-library/react';
import Mumble from '../components/mumble';
import '../__mocks__/intersectionObserverMock';

describe('Mumble', () => {
  it("Renders the Mumble Component and it's most important content", () => {
    render(
      <Mumble
        mumbleData={{
          id: '01H2AFQ1V1C2967CRTD5Q28RAF',
          creator: '206469305494143233',
          text: 'Test Text',
          mediaUrl: 'https://storage.googleapis.com/qwacker-api-prod-data/45df6f53-662d-40d1-9aab-cbb8318da351',
          mediaType: 'image/jpeg',
          likeCount: 2,
          likedByUser: true,
          type: 'post',
          replyCount: 0,
          creatorData: {
            id: '206469305494143233',
            userName: 'test',
            firstName: 'Hans',
            lastName: 'Muster',
            avatarUrl: '',
          },
        }}
        avatarUrl={'https://picsum.photos/160/160?random=206469305494143233'}
        isInline={false}
        onDeleteCallback={(event) => event}
      />
    );

    const displayName = screen.getByTestId('display-name');
    expect(displayName).toBeInTheDocument();
    expect(displayName).toHaveTextContent('Hans Muster');

    const userName = screen.getByTestId('mumble-username');
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent('test');

    const text = screen.getByTestId('mumble-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Test Text');
  });
  it("Renders the Mumble Component in inline mode and it's most important content", () => {
    render(
      <Mumble
        mumbleData={{
          id: '01H2AFQ1V1C2967CRTD5Q28RAF',
          creator: '206469305494143233',
          text: 'Test Text',
          mediaUrl: 'https://storage.googleapis.com/qwacker-api-prod-data/45df6f53-662d-40d1-9aab-cbb8318da351',
          mediaType: 'image/jpeg',
          likeCount: 2,
          likedByUser: true,
          type: 'post',
          replyCount: 0,
          creatorData: {
            id: '206469305494143233',
            userName: 'test',
            firstName: 'Hans',
            lastName: 'Muster',
            avatarUrl: '',
          },
        }}
        avatarUrl={'https://picsum.photos/160/160?random=206469305494143233'}
        isInline={true}
        onDeleteCallback={(event) => event}
      />
    );

    const displayName = screen.getByTestId('display-name-inline');
    expect(displayName).toBeInTheDocument();
    expect(displayName).toHaveTextContent('Hans Muster');

    const userName = screen.getByTestId('mumble-username');
    expect(userName).toBeInTheDocument();
    expect(userName).toHaveTextContent('test');

    const text = screen.getByTestId('mumble-text');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('Test Text');
  });
});
