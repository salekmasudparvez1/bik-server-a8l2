import catchAsync from "../../shared/catchAsync";
const ValidateRequest = (schema) => {
    return catchAsync(async (req, res, next) => {
        await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
            cookies: req.cookies
        });
        next();
    });
};
export default ValidateRequest;
