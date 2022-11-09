import '@testing-library/jest-dom/extend-expect';
import { Home } from 'pages/Home/Home';
import { render } from '../utils';

describe('<Home />', () => {
  it('should render the panels', () => {
    const { getByTestId } = render(<Home />);

    expect(getByTestId('header')).toBeTruthy();
    expect(getByTestId('content')).toBeTruthy();
  });
});
