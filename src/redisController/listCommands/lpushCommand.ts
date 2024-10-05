import { listFilePath } from '../../redisConstant/file';
import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { get } from 'http';

export const lpushCommandController = (key: string, value: string) => {
  try {
    const validKeyValue = checkValidKeyValue(key, value);

    if (Object.entries(validKeyValue).length === 0) {
      Logger.error(`Key or Value is invalid`);
      return;
    }

    const getJSONData = getJsonData(listFilePath);

    console.log(getJSONData);
    const ListDatabase = getJSONData['ListDatabase'];

    if (!ListDatabase[key] || !ListDatabase.hasOwnProperty(key)) {
      Logger.info(`List Database is currently Empty`);

      getJSONData['ListDatabase'][key] = [value];
      saveDataToJson(getJSONData, listFilePath);
      return 1;
    }

    if (ListDatabase[key].length > 0) {
      getJSONData['ListDatabase'][key].unshift(value);
      saveDataToJson(getJSONData, listFilePath);
      return ListDatabase[key].length;
    }
  } catch (err) {
    console.log(err);
    Logger.error(`Error in handling lpush command controller :`);
    return;
  }
};

const checkValidKeyValue = (key: string, value: string) => {
  const result = {
    key,
    value,
  };

  return key.length > 0 && value.length > 0 ? result : {};
};
