import React from 'react';
import { render } from '@testing-library/react';
import SignedIn from '../components/SignedIn';

const createTestProps = (props) => ({
  accountData: {
    avatar: '',
  },
  logout: jest.fn(),
  ...props,
});

describe('SignedIn component', () => {
  let props;

  beforeEach(() => {
    props = createTestProps({});
  });

  it('renders without crashing', () => {
    render(<SignedIn {...props} />);
  });

  it('renders without crashing w/ avatar', () => {
    props.accountData.avatar = 'hi';
    render(<SignedIn {...props} />);
  });
});
