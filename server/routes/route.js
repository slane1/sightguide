import { Router } from 'express';
import { getSights, getSight } from '../controllers/sightsController.js';
import fetchAllDatabase from '../middleware/fetchDatabase.js';

const route = Router();


// route.get('/', getSights);
// route.get('/:sight', getSight);
route.get('/all', fetchAllDatabase)

export default route;