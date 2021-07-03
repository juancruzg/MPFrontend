import express from 'express';
import cors from 'cors';

import routes from './routes';

const { HTTP_PORT = 3001 } = process.env;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// Use our router to serve api methods
app.use(routes);

app.listen(HTTP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Service HTTP:${HTTP_PORT} listening...`);
});
