import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/create', controller.create)
  .post('/', controller.getAll)
  .put('/:id', controller.update)
  .delete('/:id', controller.delete);
