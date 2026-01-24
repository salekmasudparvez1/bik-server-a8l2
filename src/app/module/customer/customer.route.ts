
import express from 'express'
import ValidateRequest from '../../middlewares/ValidateRequest.js';
import { CreateCustomerSchema, deleteCustomerByIdSchema, fetchCustomerByIdSchema, updateCustomerByIdSchema } from './customer.validation.js';
import { customerController } from './customer.controller.js';
const router = express.Router();

router.post('/',ValidateRequest(CreateCustomerSchema) ,customerController.createCustomer)
router.get('/',customerController.getCustomers)
router.get('/:id',ValidateRequest(fetchCustomerByIdSchema),customerController.getCustomerById)
router.put('/:id',ValidateRequest(updateCustomerByIdSchema),customerController.updateCustomerById)
router.delete('/:id',ValidateRequest(deleteCustomerByIdSchema),customerController.deleteCustomerById)


export const CustomerRoutes = router;