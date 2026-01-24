import express from 'express';
import ValidateRequest from '../../middlewares/ValidateRequest.js';
import { addCompletionDateSchema, createBikeServiceSchema } from './bikeservice.validation.js';
import { BikeServiceController } from './bikeservice.controller.js';
const router = express.Router();

router.post('/', ValidateRequest(createBikeServiceSchema), BikeServiceController.createBikeService)
router.get('/', BikeServiceController.getAllBikeServices);
router.get('/status', BikeServiceController.getAllBikeServiceOverdue)
router.get('/:id', BikeServiceController.getBikeServiceById);
router.put('/:id/complete', ValidateRequest(addCompletionDateSchema), BikeServiceController.addCompletionDate);


export const BikeServiceRoutes = router;