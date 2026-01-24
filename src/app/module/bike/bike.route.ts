import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest.js';
import { createBikeSchema, fetchBikeByIdSchema } from './bike.validation.js';
import { BikeController } from './bike.controller.js';

const router = express.Router();

router.post('/',ValidateRequest(createBikeSchema), BikeController.createBike);
router.get('/', BikeController.getAllBikes);
router.get('/:id',ValidateRequest(fetchBikeByIdSchema), BikeController.getBikeById);


export const BikeRoutes = router;
