import axios from 'axios';

import { GET_ITEM_URL, GET_ITEMS_URL, GET_ITEM_DESCRIPTION_URL } from './consts';
import Item from './item';

const getItem = async (id) => {
    // First we call ML api to get item detail.
    const response = await axios.get(GET_ITEM_URL.replace(':id', id));

    if (response.data && response.data) {
        // We construct a new Item so that we only filter the desired props.
        const item = new Item(response.data);

        const [picture] = response.data.pictures;

        // The ML method sends multiple imgs, we'll take the 1st one and set it to our item.
        item.picture = picture.secure_url;

        // Now that our item is ready, we need to retrieve the description.
        const descResponse = await axios.get(GET_ITEM_DESCRIPTION_URL.replace(':id', id));

        // Set the description.
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
    // First we call ML api to search items.
    const response = await axios.get(GET_ITEMS_URL, { params: { q: search } });

    if (response.data && response.data.results && response.data.results.length) {
        // We only need to return 4 results
        const results = response.data.results.slice(0, 4);

        // Then we construct new Items for each of the 4 retrieved ones, to filter undesired properties.
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
