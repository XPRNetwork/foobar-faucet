import React from 'react';
import { render } from '@testing-library/react';
import Top from '../pages/Top';
import * as AuthProvider from '../utils/providers/AuthProvider';

describe('Top component', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  it('renders without crashing as Login', () => {
    const output = render(<Top />);
    expect(output.getByTestId('login')).not.toBeNull();
  });

  it('renders without crashing as SignedIn', () => {
    useAuthContextSpy.mockReturnValue({
      auth: 'test',
      permission: 'test',
      accountData: {test: 'test'},
    });

    const output = render(<Top />);
    expect(output.getByTestId('signedIn')).not.toBeNull();
  });
});
