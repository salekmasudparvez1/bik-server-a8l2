// Test comment to check file updates
import express from "express";
import cors from "cors";
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
export default app;
