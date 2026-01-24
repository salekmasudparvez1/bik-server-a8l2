import { Server } from 'http';


import config from './app/config/index.js'; 
import app from './app.js';

async function main() {
  if (process.env.NODE_ENV !== 'production') {
    const server: Server = app.listen(config.port, () => {
      console.log('Server is running on port', config.port);
    });
  }
}

main();

export default app;