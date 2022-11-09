import '@testing-library/jest-dom/extend-expect';
import { Header } from 'components/Header';
import { render } from '../utils';

describe('<Header />', () => {
  it('should render the club name', () => {
    const { getByText } = render(<Header height={100} />);

    expect(getByText('n00trals')).toBeTruthy();
  });

  it('should render the icon', () => {
    const { container } = render(<Header height={40} />);

    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render the colors', () => {
    const { getByTestId } = render(<Header height={40} />);

    const colors = getByTestId('colors');
    expect(colors.querySelectorAll('div').length).toBe(6);
  });
});
