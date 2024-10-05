import net from 'net';
import dotenv from 'dotenv';
import Logger from './libs/logger';

dotenv.config();

const port = process.env.CUSTOM_REDIS_PORT ?? 8001;

const server = net.createServer((connection) => {
  Logger.info(`A Client is Connected : ${connection}`);
});

server.listen(port, () => {
  Logger.success(`Server is runnng on the port : ${port}`);
});
