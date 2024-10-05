import { stringFilePath } from '../../redisConstant/file';
import { getJsonData } from '../../fileHandler';
import Logger from '../../libs/logger';

export const getCommadFunction = (key: string) => {
  let keyValue = [];
  const validKey = checkValidKey(key);

  if (!validKey) {
    Logger.error(`Key is not Valid`);
    return;
  }

  const jsonData = getJsonData(stringFilePath);
  const stringDatabase = jsonData['String_Database'];

  for (const [keys, value] of Object.entries(stringDatabase)) {
    if (key.includes(key) && key.toLowerCase() === keys) {
      keyValue.push(value);
    }
  }

  const flatedValue = keyValue.flat();

  return flatedValue[0];
};

export const checkValidKey = (key: string) => {
  if (key.length > 0) {
    return key;
  }
  return null;
};
