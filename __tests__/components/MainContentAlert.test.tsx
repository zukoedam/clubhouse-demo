import '@testing-library/jest-dom/extend-expect';
import { MainContentAlert } from 'components/MainContentAlert';
import { Y00TsIcon } from 'icons/Y00TsIcon';
import { render } from '../utils';

describe('<MainContentAlert />', () => {
  it('should render a warning alert message', () => {
    const { container, getByText } = render(<MainContentAlert color="warning" icon={Y00TsIcon} message="Alert!" />);

    expect(getByText('Alert!')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a danger alert message', () => {
    const { container, getByText } = render(<MainContentAlert color="danger" icon={Y00TsIcon} message="Alert!" />);

    expect(getByText('Alert!')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a primary alert message', () => {
    const { container, getByText } = render(<MainContentAlert color="primary" icon={Y00TsIcon} message="Alert!" />);

    expect(getByText('Alert!')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a default alert message', () => {
    const { container, getByText } = render(<MainContentAlert icon={Y00TsIcon} message="Alert!" />);

    expect(getByText('Alert!')).toBeTruthy();
    expect(container.querySelector('svg')).toBeTruthy();
  });

  it('should render a linked alert message', () => {
    const { container } = render(<MainContentAlert href="#link" icon={Y00TsIcon} message="Alert!" />);

    expect(container.firstChild?.nodeName).toBe('A');
    expect(container.firstChild).toHaveAttribute('href', '#link');
  });
});
