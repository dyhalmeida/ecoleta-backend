import express from 'express';
import ItemController from './controllers/itemController';
import PointController from './controllers/pointController';

const routes = express.Router();

routes.get('/', (request, response) => response.json({ message: 'E-coleta API running' }));

routes.get('/items', ItemController.index);

routes.post('/points', PointController.store);

export default routes;