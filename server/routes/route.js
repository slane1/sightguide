import { Router } from 'express';
import { getSights, getSight } from '../controllers/sightsController.js';

const route = Router();


route.get('/', getSights);
route.get('/:sight', getSight);

export default route;