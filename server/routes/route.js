import { Router } from 'express';
import { getSights, getSight } from '../controllers/sightsController.js';
import {fetchAllDatabase, pushImage, pushGeo, fetchSightImg} from '../middleware/fetchDatabase.js';

const route = Router();


// route.get('/', getSights);
// route.get('/:sight', getSight);
route.get('/all', fetchAllDatabase)
route.get('/complete', fetchSightImg)
// route.get('/push', pushGeo)

export default route;