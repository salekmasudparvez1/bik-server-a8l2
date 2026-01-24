import express from "express"
import { CustomerRoutes } from "../module/customer/customer.route.js";
import { BikeRoutes } from "../module/bike/bike.route.js";
import { BikeServiceRoutes } from "../module/service/bikeservice.route.js";

const router = express.Router();

interface IModuleRoutes {
    path: string;
    route: express.Router;
}
const moduleRoutes :IModuleRoutes[]  = [
    {
        path: '/customers',
        route: CustomerRoutes
    },
    {
        path : '/bikes',
        route  :BikeRoutes
    },
    {
       path : '/services',
       route : BikeServiceRoutes
    }
    
]

moduleRoutes.forEach((route) => router.use(route?.path, route?.route))

export default router;