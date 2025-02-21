import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header Component', () => {
  it('should render the logo and favorites section', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Dragon Ball Logo')).toBeInTheDocument();

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
