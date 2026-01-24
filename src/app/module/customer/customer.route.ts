
import express from 'express'
import { customerController } from './customer.controller';
import ValidateRequest from '../../middlewares/ValidateRequest';
import { CreateCustomerSchema, deleteCustomerByIdSchema, fetchCustomerByIdSchema, updateCustomerByIdSchema } from './customer.validation';

const router = express.Router();

router.post('/',ValidateRequest(CreateCustomerSchema) ,customerController.createCustomer)
router.get('/',customerController.getCustomers)
router.get('/:id',ValidateRequest(fetchCustomerByIdSchema),customerController.getCustomerById)
router.put('/:id',ValidateRequest(updateCustomerByIdSchema),customerController.updateCustomerById)
router.delete('/:id',ValidateRequest(deleteCustomerByIdSchema),customerController.deleteCustomerById)


export const CustomerRoutes = router;