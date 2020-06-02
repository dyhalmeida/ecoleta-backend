import { Request, Response } from 'express';
import knex from '../database/connection';

class PointController {

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

    return response.json();

  }

}

export default new PointController()