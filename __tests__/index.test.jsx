import { render, screen } from '@testing-library/react';
import PageHome from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<PageHome />);

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
