import { Server } from 'http';
import app from './app.js';
import config from './app/config/index.js';

async function main() {
  const port = Number(config.port) || 5000;
  const server: Server = app.listen(port, () => {
    console.log('Server is running on port', port);
  });
  return server;
}

main();

export default app;