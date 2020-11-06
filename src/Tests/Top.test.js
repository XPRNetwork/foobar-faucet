import React from 'react';
import { render } from '@testing-library/react';
import Top from '../pages/Top';
import * as AuthProvider from '../utils/providers/AuthProvider';

describe('Top component', () => {
  const useAuthContextSpy = jest.spyOn(AuthProvider, 'useAuthContext');

  it('renders without crashing as Login', () => {
    render(<Top />);
  });

  it('renders without crashing as ', () => {
    useAuthContextSpy.mockReturnValue({
      auth: 'test',
      permission: 'test',
      accountData: {test: 'test'},
    });

    render(<Top />);
  });
});
