import { Router } from 'express';
import { getSights, getSight } from '../controllers/sightsController.js';
import {fetchAllDatabase, pushImage, pushGeo} from '../middleware/fetchDatabase.js';

const route = Router();


// route.get('/', getSights);
// route.get('/:sight', getSight);
route.get('/all', fetchAllDatabase)
route.get('/push', pushGeo)

export default route;