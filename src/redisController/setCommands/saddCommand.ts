import { json } from 'stream/consumers';
import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { setFilePath } from '../../redisConstant/file';

export const saddCommandController = (key: string, value: string) => {
  const validKey = checkValidKey(key);

  if (!validKey) {
    Logger.error(`Key is not Valid`);
  }

  const jsonData = getJsonData(setFilePath);
  const setDatabase = jsonData['SetDatabase'];
  const existsKey = checkIfKeyExists(key);

  if (!existsKey) {
    Logger.info(`New key : ${key} is Created!!`);
    jsonData['SetDatabase'][key] = [value];
    saveDataToJson(jsonData, setFilePath);
    return 1;
  }

  const checkUniqueValue = getKeyValue(key, value);

  if (checkUniqueValue) {
    return 0;
  }
  if (
    jsonData['SetDatabase'][key] &&
    jsonData['SetDatabase'][key].length === 0
  ) {
    jsonData['SetDatabase'][key].push(value);
    saveDataToJson(jsonData, setFilePath);
    return 1;
  }

  if (jsonData['SetDatabase'][key].length > 0) {
    jsonData['SetDatabase'][key].push(value);
    saveDataToJson(jsonData, setFilePath);
    return 1;
  }
};

const getKeyValue = (key: string, value: string) => {
  let validValue = [];
  const jsonData = getJsonData(setFilePath);
  const setDatabase = jsonData['SetDatabase'];
  for (const [keys, values] of Object.entries(setDatabase)) {
    if (keys.includes(key)) {
      for (const item of values as any) {
        if (item === value) {
          validValue.push(values);
        }
      }
    }
  }
  return validValue.length > 0;
};

const checkIfKeyExists = (key: string) => {
  let isKeyValid = false;
  const jsonData = getJsonData(setFilePath);
  const setDatabase = jsonData['SetDatabase'];

  for (const [keys, values] of Object.entries(setDatabase)) {
    if (keys.includes(key)) {
      isKeyValid = true;
    }
  }
  return isKeyValid;
};

const checkValidKey = (key: string) => {
  return key.length > 0 ? true : false;
};
