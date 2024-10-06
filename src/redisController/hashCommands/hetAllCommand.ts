import { getJsonData } from '../../fileHandler';
import Logger from '../../libs/logger';
import { hashFilePath } from '../../redisConstant/file';

export const hgetAllCommandController = (key: string) => {
  const validKey = checkValidKey(key);
  if (!validKey) {
    Logger.error(`Key is not Valid : ${key}`);
  }

  try {
    const jsonData = getJsonData(hashFilePath);
    const keyExists = checkKeyExists(jsonData, key);

    if (!keyExists) {
      Logger.error(`Key Does Not Exists`);
      return 0;
    }

    const keyValue = getKeyValue(jsonData, key);
    const parsedStr = convertObjToStr(keyValue);
    return parsedStr;
  } catch (err) {
    Logger.error(`Error in the hget command controller`);
    return;
  }
};

const convertObjToStr = (obj: any) => {
  let str = '';

  for (const [key, value] of Object.entries(obj)) {
    str = key + ' ' + value;
  }
  return str;
};

const getKeyValue = (jsonData: any, key: string) => {
  for (const [keys, values] of Object.entries(jsonData['HashDatabase'])) {
    if (keys.includes(key)) {
      return jsonData['HashDatabase'][key];
    }
  }
};

const checkKeyExists = (jsonData: any, key: string) => {
  let isExists = false;

  for (const [keys, values] of Object.entries(jsonData['HashDatabase'])) {
    if (keys.includes(key)) {
      isExists = !isExists;
    }
  }
  return isExists;
};

const checkValidKey = (key: string) => {
  return key.length > 0 ? key : null;
};
