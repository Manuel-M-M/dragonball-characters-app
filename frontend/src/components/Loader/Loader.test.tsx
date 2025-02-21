import '@testing-library/jest-dom';
import 'jest-styled-components';
import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';

describe('Loader Component', () => {
  it('should render correctly', () => {
    render(<Loader />);
    expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
  });

  it('should have a spinning animation', () => {
    render(<Loader />);
    const loader = screen.getByLabelText(/loading/i);
    expect(loader).toHaveStyleRule('animation', expect.stringMatching(/infinite/));
  });
});
