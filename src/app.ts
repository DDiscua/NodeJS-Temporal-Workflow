import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(express.json());
app.use(express.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

export { app };
