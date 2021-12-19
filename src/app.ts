import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.status(201).send();
});

export { app };
