const BASE_URL = window.BASE_URL;

const GET_ITEM = `${BASE_URL}/api/items/:id`;
const GET_ITEMS = `${BASE_URL}/api/items?q=:query`;

export { GET_ITEM, GET_ITEMS };