import express from 'express';
import { BikeController } from './bike.controller';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { createBikeSchema, fetchBikeByIdSchema } from './bike.validation';
const router = express.Router();
router.post('/', ValidateRequest(createBikeSchema), BikeController.createBike);
router.get('/', BikeController.getAllBikes);
router.get('/:id', ValidateRequest(fetchBikeByIdSchema), BikeController.getBikeById);
export const BikeRoutes = router;
