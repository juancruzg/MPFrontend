import React from 'react';
import { render, screen } from '@testing-library/react'

import Breadcrumb from './Breadcrumb';

test('should display many categories', () => {
    render(<Breadcrumb items={[ "mock1", "mock2" ]} />);

    expect(screen.getByText('mock1')).toBeInTheDocument();
    expect(screen.getByText('mock2')).toBeInTheDocument();
});

test('should display nothing', () => {
    const { container } = render(<Breadcrumb items={[]} />);

    expect(container).toBeEmptyDOMElement();
});
