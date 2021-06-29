const BASE_URL = 'https://api.mercadolibre.com/';

const GET_ITEM_URL = `${BASE_URL}items/:id`;
const GET_ITEMS_URL = `${BASE_URL}sites/MLA/search`;
const GET_ITEM_DESCRIPTION_URL = `${BASE_URL}items/:id/description`;
const GET_CATEGORIES = `${BASE_URL}categories/:id`;

export {
    GET_ITEM_URL,
    GET_ITEMS_URL,
    GET_ITEM_DESCRIPTION_URL,
    GET_CATEGORIES,
    BASE_URL,
};
