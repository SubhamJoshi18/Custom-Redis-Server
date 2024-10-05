import { getJsonData } from '../../fileHandler';
import Logger from '../../libs/logger';
import { listFilePath } from '../../redisConstant/file';

export const llenCommandController = (key: string) => {
  const validKey = checkValidKey(key);

  if (!validKey) {
    Logger.error(`Key is not valid`);
  }

  const existsKey = checkKey(key);

  if (!existsKey) {
    Logger.error(`Key Does Not Exists`);
    return;
  }

  const lengthList = getLengthOfKey(key);
  return lengthList;
};

const checkKey = (key: string) => {
  let keyExists = false;
  const jsonData = getJsonData(listFilePath);

  const ListDatabase = jsonData['ListDatabase'];

  for (const [keys, values] of Object.entries(ListDatabase)) {
    if (keys.includes(key)) {
      keyExists = true;
    }
  }

  return keyExists;
};

const getLengthOfKey = (key: string) => {
  const jsonData = getJsonData(listFilePath);
  return jsonData['ListDatabase'][key].length;
};

const checkValidKey = (key: string) => {
  return key.length > 0 ? true : false;
};
