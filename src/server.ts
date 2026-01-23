import { Server } from 'http';
import app from './app';
import config from './app/config';

async function main() {
  // Only run the server locally, Vercel will handle it in production
  if (process.env.NODE_ENV !== 'production') {
    const server: Server = app.listen(config.port, () => {
      console.log('Server is running on port', config.port);
    });
  }
}

main();

export default app;