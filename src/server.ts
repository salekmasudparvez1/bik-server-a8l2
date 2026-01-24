import { Server } from 'http';
import app from './app.js';
import config from './app/config/index.js';




async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const server: Server = app.listen(config.port, () => {
      console.log('Server is running on port', config.port);
    });
  }
}

main();

export default app;