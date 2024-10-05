import Logger from '../libs/logger';

export const handleRedisError = (err: any) => {
  Logger.error(err);
};
