import axios from 'axios';

import {
    GET_ITEM_URL,
    GET_ITEMS_URL,
    GET_ITEM_DESCRIPTION_URL,
    GET_CATEGORIES,
} from './consts';
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

        // Retrieve item category.
        const categoryResponse = await axios.get(GET_CATEGORIES.replace(':id', response.data.category_id));

        const categories = categoryResponse.data.path_from_root.map((cr) => cr.name);

        return {
            categories,
            item,
            author: {
                name: 'Juan Cruz',
                lastname: 'Grasso',
            },
        };
    }

    throw { response: { statusText: 'Something went wrong', status: 500 } };
};

const getItems = async (search) => {
    // First we call ML api to search items.
    const response = await axios.get(GET_ITEMS_URL, { params: { q: search } });

    if (response.data && response.data.results && response.data.results.length) {
        // We only need to return 4 results.
        const results = response.data.results.slice(0, 4);

        // Then we construct new Items for each of the 4 retrieved ones, to filter undesired properties.
        const items = results.map((result) => new Item(result));

        // Retrieve the categories.
        const categoryFilters = response.data.filters.find((f) => f.id === 'category');

        let categories = [];

        if (categoryFilters && categoryFilters.values) {
            categories = categoryFilters.values[0].path_from_root.map((pfr) => pfr.name);
        }

        return {
            categories,
            items,
            author: {
                name: 'Juan Cruz',
                lastname: 'Grasso',
            },
        };
    }

    if (response.data.results && !response.data.results.length) {
        throw { response: { statusText: 'Not Found', status: 404 } };
    }

    throw { response: { statusText: 'Something went wrong', status: 500 } };
};

export { getItem, getItems };
