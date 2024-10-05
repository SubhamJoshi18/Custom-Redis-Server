import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { listFilePath } from '../../redisConstant/file';

export const rpopCommandController = (key: string) => {
  const checkValidKeyValue = checkKeyandValue(key);

  if (Object.entries(checkValidKeyValue).length === 0) {
    Logger.error(`Key and Value is Invalid`);
    return;
  }

  const keyExists = checkKeyExists(key);

  if (!keyExists) {
    Logger.error(`Key Does not Exists in Database`);
    return;
  }

  const jsonData = getJsonData(listFilePath);

  const ListDatabase = jsonData['ListDatabase'];

  if (ListDatabase[key].length > 0) {
    jsonData['ListDatabase'][key].pop();
    saveDataToJson(jsonData, listFilePath);
    return jsonData['ListDatabase'][key].length;
  }
};

const checkKeyExists = (key: string) => {
  let checkValid = [];
  const jsonData = getJsonData(listFilePath);
  const ListDatabase = jsonData['ListDatabase'];
  for (const [keys, values] of Object.entries(ListDatabase)) {
    if (keys.includes(key)) {
      Logger.info(`Key Exists in In Memory Database`);
      checkValid.push(values);
    }
  }
  return checkValid.flat().length > 0 ? true : false;
};

export const checkKeyandValue = (key: string) => {
  const result = {
    key,
  };
  return key.length > 0 ? result : {};
};
