import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { getItem, getItems } from './itemController';
import {
    GET_ITEM_URL,
    GET_ITEMS_URL,
    GET_ITEM_DESCRIPTION_URL,
    GET_CATEGORIES,
} from './consts/URLs';

// Item Mock
const getItemMock = {
    id: 'ML-1',
    category_id: 'ML-C1',
    title: 'Un producto',
    description: 'Descripción de un producto',
    price: 2000,
    thumbnail: 'https://ml.com/imagen',
    pictures: [{ secure_url: 'https://ml.com/imagen' }],
    condition: 'new',
    shipping: {
        free_shipping: true,
    },
    address: {
        city_name: 'rosario',
    },
    currency_id: 'ARs',
    sold_quantity: 5,
};

const filtersMock = [{
    id: 'category',
    values: [
        { path_from_root: [{ name: 'Category 1' }, { name: 'Category 2' }] },
    ],
}];

const getItemDescriptionMock = {
    plain_text: 'SomeDescription',
};

// Categories Mock
const getItemCategoriesMock = {
    path_from_root: [{ name: 'Category 1' }, { name: 'Category 2' }],
};

const mock = new MockAdapter(axios);

describe('Item Controller - getItem', () => {
    it('fetchs a valid item', async () => {
        mock.onGet(GET_ITEM_URL.replace(':id', getItemMock.id)).reply(200, getItemMock);
        mock.onGet(GET_ITEM_DESCRIPTION_URL.replace(':id', getItemMock.id)).reply(200, getItemDescriptionMock);
        mock.onGet(GET_CATEGORIES.replace(':id', getItemMock.category_id)).reply(200, getItemCategoriesMock);

        const { item, categories } = await getItem('ML-1');

        expect(categories.length).toBe(getItemCategoriesMock.path_from_root.length);
        expect(categories).toEqual(getItemCategoriesMock.path_from_root.map((pfr) => pfr.name));

        expect(item).not.toBeNull();
        expect(item.description).toEqual(getItemDescriptionMock.plain_text);
        expect(item.id).toEqual(getItemMock.id);
        expect(item.title).toEqual(getItemMock.title);
        expect(item.price).toEqual({
            amount: getItemMock.price,
            currency: getItemMock.currency_id,
            decimals: 2,
        });
        expect(item.picture).toEqual(getItemMock.pictures[0].secure_url);
        expect(item.condition).toEqual(getItemMock.condition);
        expect(item.freeShipping).toEqual(getItemMock.shipping.free_shipping);
        expect(item.location).toEqual(getItemMock.address.city_name);
        expect(item.soldQuantity).toEqual(getItemMock.sold_quantity);
    });

    it('fetchs a non-existent item', async () => {
        mock.onGet(GET_ITEM_URL.replace(':id', getItemMock.id)).reply(404, getItemMock);
        mock.onGet(GET_ITEM_DESCRIPTION_URL.replace(':id', getItemMock.id)).reply(200, getItemDescriptionMock);
        mock.onGet(GET_CATEGORIES.replace(':id', getItemMock.category_id)).reply(200, getItemCategoriesMock);

        try {
            await getItem('ML-1');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(404);
        }
    });

    it('fetchs a non-existent item description', async () => {
        mock.onGet(GET_ITEM_URL.replace(':id', getItemMock.id)).reply(200, getItemMock);
        mock.onGet(GET_ITEM_DESCRIPTION_URL.replace(':id', getItemMock.id)).reply(404, getItemDescriptionMock);
        mock.onGet(GET_CATEGORIES.replace(':id', getItemMock.category_id)).reply(200, getItemCategoriesMock);

        try {
            await getItem('ML-1');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(404);
        }
    });

    it('fetchs a non-existent categories', async () => {
        mock.onGet(GET_ITEM_URL.replace(':id', getItemMock.id)).reply(200, getItemMock);
        mock.onGet(GET_ITEM_DESCRIPTION_URL.replace(':id', getItemMock.id)).reply(200, getItemDescriptionMock);
        mock.onGet(GET_CATEGORIES.replace(':id', getItemMock.category_id)).reply(404, getItemCategoriesMock);

        try {
            await getItem('ML-1');
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(404);
        }
    });

    it('fetchs an invalid item', async () => {
        const modifiedMock = { ...getItemMock, id: null };

        mock.onGet(GET_ITEM_URL.replace(':id', modifiedMock.id)).reply(200, modifiedMock);
        mock.onGet(GET_ITEM_DESCRIPTION_URL.replace(':id', modifiedMock.id)).reply(200, getItemDescriptionMock);
        mock.onGet(GET_CATEGORIES.replace(':id', modifiedMock.category_id)).reply(200, getItemCategoriesMock);

        try {
            await getItem(modifiedMock.id);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(500);
        }
    });
});

describe('Item Controller - getItems', () => {
    const searchText = 'search';

    it('should get 4 items', async () => {
        mock.onGet(GET_ITEMS_URL, { params: { q: searchText } }).reply(200, {
            results: [getItemMock, getItemMock, getItemMock, getItemMock, getItemMock],
            filters: filtersMock,
        });

        const { items, categories } = await getItems(searchText);

        expect(categories.length).toBe(filtersMock[0].values[0].path_from_root.length);
        expect(categories).toEqual(filtersMock[0].values[0].path_from_root.map((pfr) => pfr.name));

        expect(items.length).toBe(4);
    });

    it('should search for valid items', async () => {
        mock.onGet(GET_ITEMS_URL, { params: { q: searchText } }).reply(200, {
            results: [getItemMock],
            filters: filtersMock,
        });

        const { items, categories } = await getItems(searchText);

        expect(categories.length).toBe(filtersMock[0].values[0].path_from_root.length);
        expect(categories).toEqual(filtersMock[0].values[0].path_from_root.map((pfr) => pfr.name));

        expect(items.length).toBe(1);
        expect(items[0].id).toEqual(getItemMock.id);
        expect(items[0].title).toEqual(getItemMock.title);
        expect(items[0].price).toEqual({ currency: getItemMock.currency_id, amount: getItemMock.price, decimals: 2 });
        expect(items[0].picture).toEqual(getItemMock.thumbnail);
        expect(items[0].condition).toEqual(getItemMock.condition);
        expect(items[0].freeShipping).toEqual(getItemMock.shipping.free_shipping);
        expect(items[0].location).toEqual(getItemMock.address.city_name);
        expect(items[0].soldQuantity).toEqual(getItemMock.sold_quantity);
    });

    it('should find no items (on ML side)', async () => {
        mock.onGet(GET_ITEMS_URL, { params: { q: searchText } }).reply(404, {
            results: [getItemMock],
            filters: filtersMock,
        });

        try {
            await getItems(searchText);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(404);
        }
    });

    it('should find no items (on our side)', async () => {
        mock.onGet(GET_ITEMS_URL, { params: { q: searchText } }).reply(200, {
            results: [],
            filters: filtersMock,
        });

        try {
            await getItems(searchText);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(404);
        }
    });

    it('should expect an invalid response', async () => {
        mock.onGet(GET_ITEMS_URL, { params: { q: searchText } }).reply(500, {
            results: [getItemMock],
            filters: filtersMock,
        });

        try {
            await getItems(searchText);
        } catch (error) {
            expect(error).toBeDefined();
            expect(error.response).toBeDefined();
            expect(error.response.status).toBe(500);
        }
    });
});
