import { render, screen } from '@testing-library/react';
import PageHome from '../pages/index';
import '../__mocks__/intersectionObserverMock';

describe('Home', () => {
  it('renders a heading', () => {
    render(<PageHome />);

    const heading = screen.getByTestId('heading');

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Willkommen auf Mumble');
  });
});
