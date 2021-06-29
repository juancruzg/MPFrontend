import express from 'express';
import cors from 'cors';

import { getItem, getItems } from './itemController';

const { HTTP_PORT = 3001 } = process.env;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// Endpoint to search items
app.get('/api/items', async (req, res) => {
    const { query: { q } } = req;

    try {
        const items = await getItems(q);

        res.status(200).json(items);
    } catch (error) {
        res.status(error.response.status || 500).send(error.response.statusText);
    }
});

// Endpoint to find specific item
app.get('/api/items/:id', async (req, res) => {
    const { params: { id } } = req;

    try {
        const items = await getItem(id);

        res.status(200).json(items);
    } catch (error) {
        res.status(error.response.status || 500).send(error.response.statusText);
    }
});

app.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Service HTTP:${HTTP_PORT} listening...`);
});
