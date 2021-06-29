import express from 'express';
import axios from 'axios';

const { HTTP_PORT = 3001 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

app.get('/api/items', () => {
    axios.get('https://api.mercadolibre.com/sites/MLA/search?q=iphone').then((res) => {
        console.log(res.data);
    });
});

app.get('/api/items/:id', () => {
    console.log('holi');
});

app.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Service HTTP:${HTTP_PORT} listening...`);
});
