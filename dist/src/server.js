import app from "./app";
const port = 3000;
const main = async () => {
    const server = app.listen(port, () => {
        console.log('App is running on port', port);
    });
};
main();
