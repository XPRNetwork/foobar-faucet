import React from 'react';
import { render } from '@testing-library/react';
import SignedIn from '../components/SignedIn';

const createTestProps = (props) => ({
  accountData: {
    avatar: 'hi',
  },
  logout: jest.fn(),
  ...props,
});

describe('Account component', () => {
  let props;

  beforeEach(() => {
    props = createTestProps({});
  });

  it('renders without crashing', () => {
    render(<SignedIn {...props} />);
  });

  it('renders without crashing', () => {
    props.accountData.avatar = '';
    render(<SignedIn {...props} />);
  });
});
