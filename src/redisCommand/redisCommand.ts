import Logger from '../libs/logger';
import {
  getCommand,
  setCommand,
  command,
  lpushCommand,
  lpopCommand,
  rpushCommand,
  rpopCommand,
  llenCommand,
  lrangeCommand,
} from '../redisConstant';
import { lpopCommandController } from '../redisController/listCommands/lpopCommand';
import { lpushCommandController } from '../redisController/listCommands/lpushCommand';
import { rpushCommandController } from '../redisController/listCommands/rpushCommand';
import { getCommadFunction } from '../redisController/stringCommands/getCommandController';
import { setCommandFunction } from '../redisController/stringCommands/setCommandController';
import { rpopCommandController } from '../redisController/listCommands/rpopCommand';
import { llenCommandController } from '../redisController/listCommands/llenCommand';
import { lrangeCommandController } from '../redisController/listCommands/lrangeCommand';

export const selectCommandRedis = (
  dataCommand: Array<string>,
  connection: any
) => {
  let command = dataCommand[0].toLowerCase();
  try {
    switch (command) {
      case getCommand: {
        Logger.info(`This is the Get Command`);
        const key = dataCommand[1];

        const data = getCommadFunction(key);
        connection.write(`+${data}\r\n`);
        break;
      }

      case setCommand: {
        Logger.info(`This is the Set Command`);
        const key = dataCommand[1];
        const value = dataCommand[2];
        setCommandFunction(key, value);
        break;
      }

      case lpushCommand: {
        Logger.info(`This is the LpushCommand`);
        const key = dataCommand[1];
        const value = dataCommand[2];
        const data = lpushCommandController(key, value);
        connection.write(`:${data}\r\n`);
        break;
      }

      case lpopCommand: {
        Logger.info(`This is the LpopCommand`);
        const key = dataCommand[1];
        const data = lpopCommandController(key);
        connection.write(`+${data}\r\n`);
        break;
      }

      case rpushCommand: {
        Logger.info(`This is the Rpush Command`);
        const key = dataCommand[1];
        const value = dataCommand[2];
        const data = rpushCommandController(key, value);
        connection.write(`:${data}\r\n`);
        break;
      }

      case rpopCommand: {
        Logger.info(`This is the Rpop Command`);
        const key = dataCommand[1];
        const data = rpopCommandController(key);
        connection.write(`:${data}\r\n`);
        break;
      }

      case llenCommand: {
        Logger.info(`This is the length of the list`);
        const key = dataCommand[1];
        const data = llenCommandController(key);
        connection.write(`:${data}\r\n`);
        break;
      }

      case lrangeCommand: {
        Logger.info(`This is the range of the list`);
        const key = dataCommand[1];
        const start = Number(dataCommand[2]);
        const end = Number(dataCommand[3]);
        const data = lrangeCommandController(key, start, end);
        connection.write(`+${data}\r\n`);
        break;
      }
      case command: {
        Logger.info(`Connected to the Custom Redis Client`);
      }
      default: {
        Logger.info(`Custom Redis Server Running `);
      }
    }
  } catch (err) {
    Logger.error(`Error while selecting the Command`);
  }
};
