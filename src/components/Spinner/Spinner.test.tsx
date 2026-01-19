import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);
    const spinnerContainer = container.firstChild as HTMLElement;

    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer.style.display).toBe('flex');
    expect(container.querySelectorAll('div')).toHaveLength(2);
  });
});
