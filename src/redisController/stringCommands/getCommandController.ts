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
  const value = getKeyValue(jsonData, key);
  return value;
};

export const getKeyValue = (jsonData: any, key: string) => {
  let validValue = [];
  for (const [keys, values] of Object.entries(jsonData['String_Database'])) {
    if (keys.includes(key)) {
      validValue.push(values);
    }
  }
  return validValue.flat()[0];
};

export const checkValidKey = (key: string) => {
  if (key.length > 0) {
    return key;
  }
  return null;
};
