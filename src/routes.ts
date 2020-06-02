import express from 'express';
const routes = express.Router();

routes.get('/', (request, response) => response.json({ message: 'E-coleta API running' }));

export default routes;