import express from "express";
import { CustomerRoutes } from "../module/customer/customer.route";
import { BikeRoutes } from "../module/bike/bike.route";
import { BikeServiceRoutes } from "../module/service/bikeservice.route";
const router = express.Router();
const moduleRoutes = [
    {
        path: '/customers',
        route: CustomerRoutes
    },
    {
        path: '/bikes',
        route: BikeRoutes
    },
    {
        path: '/services',
        route: BikeServiceRoutes
    }
];
moduleRoutes.forEach((route) => router.use(route?.path, route?.route));
export default router;
