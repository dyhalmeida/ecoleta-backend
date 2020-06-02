import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.json({
    message: 'E-coleta API running'
  })
});

app.listen(3333);