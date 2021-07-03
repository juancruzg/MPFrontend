import { Router } from 'express';

import { getItem, getItems } from '../service/itemController';

const router = Router();

// Endpoint to search items
router.get('/api/items', async (req, res) => {
    const { query: { q } } = req;

    try {
        const items = await getItems(q);

        res.status(200).json(items);
    } catch (error) {
        res.status(error.response.status || 500).send({ message: error.response.statusText });
    }
});

// Endpoint to find specific item
router.get('/api/items/:id', async (req, res) => {
    const { params: { id } } = req;

    try {
        const items = await getItem(id);

        res.status(200).json(items);
    } catch (error) {
        res.status(error.response.status || 500).send({ message: error.response.statusText });
    }
});

export default router;
