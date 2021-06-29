import axios from 'axios';

import { GET_ITEM_URL, GET_ITEMS_URL, GET_ITEM_DESCRIPTION_URL } from './consts';
import Item from './item';

const getItem = async (id) => {
    const response = await axios.get(GET_ITEM_URL.replace(':id', id));

    if (response.data && response.data) {
        const item = new Item(response.data);

        const [picture] = response.data.pictures;

        // Set picture
        item.picture = picture.secure_url;

        const descResponse = await axios.get(GET_ITEM_DESCRIPTION_URL.replace(':id', id));

        // Set description
        item.description = descResponse.data.plain_text;

        return {
            categories: ['Celulares y Teléfonos', 'Celulares y Smartphones'],
            item,
            author: {
                name: 'Juan Cruz',
                lastname: 'Grasso',
            },
        };
    }

    throw Error('Something went wrong');
};

const getItems = async (search) => {
    const response = await axios.get(GET_ITEMS_URL, { params: { q: search } });

    if (response.data && response.data.results && response.data.results.length) {
        // We only need to return 4 results
        const results = response.data.results.slice(0, 4);
        const items = results.map((result) => new Item(result));

        return {
            categories: ['Celulares y Teléfonos', 'Celulares y Smartphones'],
            items,
            author: {
                name: 'Juan Cruz',
                lastname: 'Grasso',
            },
        };
    }

    throw Error('Something went wrong');
};

export { getItem, getItems };
