import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SortingOptions from './SortingOptions';
import { SortType } from '../../const';

describe('SortingOptions', () => {
  it('should render with current sort type', () => {
    const onSortChange = vi.fn();

    render(<SortingOptions currentSort={SortType.Popular} onSortChange={onSortChange} />);

    expect(screen.getAllByText(SortType.Popular)).toHaveLength(2);
    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should open dropdown when clicking on sort type', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();

    render(<SortingOptions currentSort={SortType.Popular} onSortChange={onSortChange} />);

    const sortButton = screen.getAllByText(SortType.Popular)[0];
    await user.click(sortButton);

    const dropdown = screen.getByRole('list');
    expect(dropdown).toHaveClass('places__options--opened');
  });

  it('should call onSortChange when selecting an option', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();

    render(<SortingOptions currentSort={SortType.Popular} onSortChange={onSortChange} />);

    const sortButton = screen.getAllByText(SortType.Popular)[0];
    await user.click(sortButton);

    const priceOption = screen.getByText(SortType.PriceLowToHigh);
    await user.click(priceOption);

    expect(onSortChange).toHaveBeenCalledWith(SortType.PriceLowToHigh);
  });

  it('should close dropdown after selecting an option', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();

    render(<SortingOptions currentSort={SortType.Popular} onSortChange={onSortChange} />);

    const sortButton = screen.getAllByText(SortType.Popular)[0];
    await user.click(sortButton);

    const priceOption = screen.getByText(SortType.PriceLowToHigh);
    await user.click(priceOption);

    const dropdown = screen.getByRole('list');
    expect(dropdown).not.toHaveClass('places__options--opened');
  });

  it('should highlight active sort option', async () => {
    const onSortChange = vi.fn();
    const user = userEvent.setup();

    render(<SortingOptions currentSort={SortType.PriceHighToLow} onSortChange={onSortChange} />);

    const sortButton = screen.getByText('Sort by').nextElementSibling as HTMLElement;
    await user.click(sortButton);

    const options = screen.getAllByRole('listitem');
    const activeOption = options.find((option) =>
      option.classList.contains('places__option--active')
    );

    expect(activeOption).toHaveTextContent(SortType.PriceHighToLow);
  });
});
