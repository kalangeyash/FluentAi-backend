const http = require('http');
const env = require('./config/env');
const createApp = require('./app');

async function start() {
  try {
    const app = await createApp();

    const server = http.createServer(app);
    const port = env.port;

    server.listen(port, () => {
      // Keep startup log minimal but informative
      // eslint-disable-next-line no-console
      console.log(`API server listening on port ${port} (${env.nodeEnv})`);
    });
  } catch (err) {
    // If we fail here, the process should crash fast and be restarted by a process manager
    // eslint-disable-next-line no-console
    console.error('Failed to start server', err);
    process.exit(1);
  }
}

start();
