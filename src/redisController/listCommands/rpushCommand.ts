import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { listFilePath } from '../../redisConstant/file';

export const rpushCommandController = (key: string, value: string) => {
  const checkValidKeyValue = checkKeyandValue(key, value);

  if (Object.entries(checkValidKeyValue).length === 0) {
    Logger.error(`Key and Value is Invalid`);
    return;
  }

  const jsonData = getJsonData(listFilePath);

  const ListDatabase = jsonData['ListDatabase'];

  if (!ListDatabase[key] || !ListDatabase.hasOwnProperty(key)) {
    Logger.info(`${key} Does not Exists, Creating It For The First Time`);
    jsonData['ListDatabase'][key] = [value];
    saveDataToJson(jsonData, listFilePath);
    return 1;
  }

  if (ListDatabase[key].length === 0) {
    jsonData['ListDatabase'][key].push(value);
    saveDataToJson(jsonData, listFilePath);
    return jsonData['ListDatabase'][key].length;
  }

  if (ListDatabase[key].length > 0) {
    jsonData['ListDatabase'][key].push(value);
    saveDataToJson(jsonData, listFilePath);
    return jsonData['ListDatabase'][key].length;
  }
};

export const checkKeyandValue = (key: string, value: string) => {
  const result = {
    key,
    value,
  };
  return key.length > 0 && value.length > 0 ? result : {};
};
