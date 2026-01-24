// Test comment to check file updates
import express from "express";
import cors from "cors";
import { StatusCodes } from "http-status-codes";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app = express();
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send({
        Message: "Ph health care server.."
    });
});
app.use('/api', router);
app.use(globalErrorHandler);
app.use((req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    });
});
export default app;
