import Logger from '../libs/logger';
import {
  getCommand,
  setCommand,
  command,
  lpushCommand,
  lpopCommand,
  rpushCommand,
} from '../redisConstant';
import { lpushCommandController } from '../redisController/listCommands/lpushCommand';
import { getCommadFunction } from '../redisController/stringCommands/getCommandController';
import { setCommandFunction } from '../redisController/stringCommands/setCommandController';

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
      }

      case setCommand: {
        Logger.info(`This is the Set Command`);
        const key = dataCommand[1];
        const value = dataCommand[2];
        setCommandFunction(key, value);
      }

      case lpushCommand: {
        Logger.info(`This is the LpushCommand`);
        const key = dataCommand[1];
        const value = dataCommand[2];
        const data = lpushCommandController(key, value);
        connection.write(`:${data}\r\n`);
      }

      case lpopCommand: {
        Logger.info(`This is the LpopCommand`);
        const key = dataCommand[1];
        
      }

      case rpushCommand: {
      }

      case lpopCommand: {
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
