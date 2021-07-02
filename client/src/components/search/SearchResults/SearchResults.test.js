import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeAll, afterEach, afterAll } from '@jest/globals';

import SearchResults from './SearchResults';
import { formatMoney } from '../../../util/Format';
import { GET_ITEMS } from '../../../consts/URLs';

// Mock react-router 
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

// Mock axios call
const mockedItem = { 
    id: 'ML1', 
    title: 'Mock',
    price: { 
        currency: "ARs", 
        amount: 1000.2,
        decimals: 2,
    },
    picture: 'mock',
    freeShipping: true,
    location: 'Rosario',
 };

const server = setupServer(
    rest.get(GET_ITEMS.replace('?q=:query', ''), (req, res, ctx) => {
        return res(ctx.json({ items: [ mockedItem ], categories: [] }));
    })
);

// Setup server mock and make cleanups
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should load and make an api call to retrieve items', async () => {
    render(<Router><SearchResults /></Router>);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('product-list')).toBeNull();

    await waitFor(() => screen.getByTestId('product-list'));

    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('product-card')).toBeInTheDocument();
    expect(screen.getByTestId('product-card-title')).toHaveTextContent(mockedItem.title);
    expect(screen.getByTestId('product-card-location')).toHaveTextContent(mockedItem.location);
    expect(screen.getByTestId('product-card-amount')).toHaveTextContent(formatMoney(mockedItem.price.amount, mockedItem.price.decimals));
    expect(screen.getByTestId('product-card-currency')).toHaveTextContent(mockedItem.price.currency);
    expect(screen.queryByTestId('loading')).toBeNull();
});

test('should push to product details route after clicking in title', async () => {  
    render(<Router><SearchResults /></Router>);

    await waitFor(() => screen.getByTestId('product-list'));

    // Trigger the search event
    fireEvent.click(screen.getByTestId('product-card-title'));
    expect(mockHistoryPush).toHaveBeenCalledWith({ pathname: `/items/${mockedItem.id}` });
});

test('should push to product details route after clicking in image', async () => {  
    render(<Router><SearchResults /></Router>);

    await waitFor(() => screen.getByTestId('product-list'));

    // Trigger the search event
    fireEvent.click(screen.getByTestId('product-card-image'));
    expect(mockHistoryPush).toHaveBeenCalledWith({ pathname: `/items/${mockedItem.id}` });
});

test('should push to product details route after clicking in price', async () => {  
    render(<Router><SearchResults /></Router>);

    await waitFor(() => screen.getByTestId('product-list'));

    // Trigger the search event
    fireEvent.click(screen.getByTestId('product-card-price'));
    expect(mockHistoryPush).toHaveBeenCalledWith({ pathname: `/items/${mockedItem.id}` });
});

test('should display an error', async () => {
    server.use(
        rest.get(GET_ITEMS.replace('?q=:query', ''), (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' }),
            );
        })
    );

    render(<Router><SearchResults /></Router>);

    await waitFor(() => screen.getByTestId('error'));

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Internal server error');
});
