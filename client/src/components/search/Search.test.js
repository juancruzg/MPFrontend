import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach } from '@jest/globals';

import Search from './Search';
import SearchResults from './searchResults/SearchResults';

jest.mock('./searchResults/SearchResults');

beforeEach(() => {
    render(<Router><Search /></Router>);
});

test('should display MercadoLibre`s logo and searchbar', () => {
    expect(screen.getByTestId('search-box')).toBeInTheDocument();
    expect(screen.getByTestId('img-logo')).toBeInTheDocument();
    expect(screen.getByTestId('search-box-button')).toBeInTheDocument();
});

test('should not search if text is empty', () => {    
    SearchResults.mockImplementation(() => <div>SearchResultsMock</div>);

    // Trigger the search event
    fireEvent.click(screen.getByTestId('search-box-button'));

    expect(screen.queryByText('SearchResultsMock')).toBeNull();
});

test('should push to search results route', () => {    
    SearchResults.mockImplementation(() => <div>SearchResultsMock</div>);

    // Enter some text on the input
    fireEvent.change(screen.getByTestId('search-box'), { target: { value: 'iphone' } });

    // Trigger the search event
    fireEvent.click(screen.getByTestId('search-box-button'));

    expect(screen.getByText('SearchResultsMock')).toBeInTheDocument();
});
