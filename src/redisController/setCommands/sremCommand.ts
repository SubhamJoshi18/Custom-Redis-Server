import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { setFilePath } from '../../redisConstant/file';

export const sremCommandController = (key: string, value: string) => {
  const validKey = checkValidKeyValue(key, value);
  const validKeyLen = Object.entries(validKey).length > 0;
  try {
    if (!validKeyLen) {
      Logger.error('Key or Value is');
      return;
    }

    const jsonData = getJsonData(setFilePath);
    const filterData = handleNotExitsValue(jsonData, key, value);
    if (!filterData) {
      Logger.error('Key Does not Exists');
      return 0;
    }

    const removedData = removeData(jsonData, key, value);
    return removedData;
  } catch (err) {
    Logger.error('Error in s rem command controller');
    return;
  }
};

const removeData = (jsonData: any, key: string, value: string) => {
  jsonData['SetDatabase'][key] = jsonData['SetDatabase'][key].filter(
    (item: any) => item !== value
  );
  saveDataToJson(jsonData, setFilePath);
  return 1;
};

const handleNotExitsValue = (jsonData: any, key: string, value: string) => {
  let isData = [];
  const setDatabase = jsonData['SetDatabase'];
  for (const [keys, values] of Object.entries(setDatabase)) {
    if (keys.includes(key)) {
      const Keyvalue: any = values;
      if (Keyvalue.includes(value)) {
        isData.push(value);
      }
    }
  }
  return isData.length > 0;
};

const checkValidKeyValue = (key: string, value: string) => {
  const result = {
    key,
    value,
  };
  return key.length > 0 && value.length > 0 ? result : {};
};
