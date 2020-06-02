import { Request, Response } from 'express';
import knex from '../database/connection';

class PointController {

  async index(request: Request, response: Response) {
    
    const { city, uf, items } = request.query;
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()))

    const points = await knex('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    return response.json(points);

  }

  async show(request: Request, response: Response) {
    
    const { id } = request.params;

    const point = await knex('points')
      .where('id', id)
      .first();

    const items = await knex('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id)
      .select('items.title');

    if (!point) return response.status(400).json();

    return response.json({ point, items });
    
  }

  async store(request: Request, response: Response) {
    
    const {
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items
    } = request.body;

    const trx = await knex.transaction();

    const [id] = await trx('points').insert({
      image,
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf
    });

    const pointItems = items.map((item_id: number) => {
      return {
        item_id,
        point_id: id
      }
    });
    await trx('points_items').insert(pointItems)
    await trx.commit();

    return response.json();

  }

}

export default new PointController()