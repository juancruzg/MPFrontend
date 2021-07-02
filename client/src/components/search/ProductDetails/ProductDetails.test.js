import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, screen, waitFor } from '@testing-library/react'
import { beforeAll, afterEach, afterAll } from '@jest/globals';

import ProductDetails from './ProductDetails';
import { formatMoney } from '../../../util/Format';
import ConditionLabel from './ConditionLabel';
import { GET_ITEM } from '../../../consts/URLs';

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
    description: 'something',
    condition: 'new',
    soldQuantity: 2,
 };

const server = setupServer(
    rest.get(GET_ITEM, (req, res, ctx) => {
        return res(ctx.json({ item: mockedItem, categories: [] }));
    })
);

// Setup server mock and make cleanups
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('should load and make an api call to retrieve items', async () => {
    render(<Router><ProductDetails /></Router>);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.queryByTestId('product')).toBeNull();

    await waitFor(() => screen.getByTestId('product'));

    expect(screen.getByTestId('product')).toBeInTheDocument();
    expect(screen.getByTestId('product-title')).toHaveTextContent(mockedItem.title);
    expect(screen.getByTestId('product-currency')).toHaveTextContent(mockedItem.price.currency);
    expect(screen.getByTestId('product-amount')).toHaveTextContent(formatMoney(mockedItem.price.amount, mockedItem.price.decimals));
    expect(screen.getByTestId('product-description')).toHaveTextContent(mockedItem.description);
    expect(screen.getByTestId('product-condition')).toHaveTextContent(ConditionLabel({ condition: mockedItem.condition }));
    expect(screen.getByTestId('product-sold-quantity')).toHaveTextContent(mockedItem.soldQuantity);
    expect(screen.queryByTestId('loading')).toBeNull();
});

test('should display an error', async () => {
    server.use(
        rest.get(GET_ITEM, (req, res, ctx) => {
            return res.once(
                ctx.status(500),
                ctx.json({ message: 'Internal server error' }),
            );
        })
    );

    render(<Router><ProductDetails /></Router>);

    await waitFor(() => screen.getByTestId('error'));

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent('Internal server error');
});
