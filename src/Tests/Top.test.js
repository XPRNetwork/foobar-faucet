import React from 'react';
import { render } from '@testing-library/react';
import Top from '../pages/Top';

describe('Account component', () => {
  it('renders without crashing', () => {
    render(<Top />);
  });
});
