import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CharacterHeartIcon } from './CharacterHeartIcon';

test('toggles heart icon on click', () => {
  render(<CharacterHeartIcon />);
  const heartIcon = screen.getByTestId('heart-icon');

  expect(heartIcon.querySelector('svg')).toHaveAttribute('fill', 'none');

  fireEvent.click(heartIcon);
  expect(heartIcon.querySelector('svg')).toHaveAttribute('fill', '#EC1D24');

  fireEvent.click(heartIcon);
  expect(heartIcon.querySelector('svg')).toHaveAttribute('fill', 'none');
});
