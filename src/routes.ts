import express from 'express';
import ItemController from './controllers/itemController';

const routes = express.Router();

routes.get('/', (request, response) => response.json({ message: 'E-coleta API running' }));

routes.get('/items', ItemController.index);

export default routes;