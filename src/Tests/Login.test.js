import React from 'react';
import { render } from '@testing-library/react'
import Login from '../components/Login';

const createTestProps = props => ({
  login: jest.fn(),
  ...props,
});

describe('Account component', () => {
  let props;

  beforeEach(() => {
    props = createTestProps({});
  });

  it('renders without crashing', () => {
    render(<Login {...props} />);
  });
});
