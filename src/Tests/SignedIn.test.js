import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignedIn from '../components/SignedIn';

const createTestProps = (props) => ({
  accountData: {
    avatar: '',
  },
  logout: jest.fn(),
  ...props,
});

describe('SignedIn component', () => {
  const useStateSpy = jest.spyOn(React, 'useState');
  window.grecaptcha = {
    ready: jest.fn((cb) => cb()),
    execute: jest.fn().mockResolvedValue('recaptcha-token'),
  };
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

  it('clicks the button calling the function', () => {
    const setButtonText = jest.fn();
    useStateSpy.mockImplementation(() => ['', setButtonText]);

    const output = render(<SignedIn {...props} />);
    const button = output.getByTestId('tokenButton');

    fireEvent.click(button);
    expect(setButtonText).toHaveBeenCalled();
  });
});
