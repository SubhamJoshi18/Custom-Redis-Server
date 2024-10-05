import net from 'net';
import dotenv from 'dotenv';
import Logger from './libs/logger';
import Parser from 'redis-parser';
import { selectCommandRedis } from './redisCommand/redisCommand';
import { handleRedisError } from './exceptions';

dotenv.config();

const port = process.env.CUSTOM_REDIS_PORT ?? 8001;

const server = net.createServer((connection) => {
  Logger.info(`A Client is Connected `);

  connection.on('data', (data) => {
    const parser = new Parser({
      returnReply: (reply) => {
        console.log(reply);
        selectCommandRedis(reply, connection);
      },

      returnError: (err) => {
        handleRedisError(err);
      },
    });

    parser.execute(data);

    connection.write('+OK\r\n');
  });
});

server.listen(port, () => {
  Logger.success(`Server is runnng on the port : ${port}`);
});
