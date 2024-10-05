import { json } from 'stream/consumers';
import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { listFilePath } from '../../redisConstant/file';

export const lpopCommandController = (key: string) => {
  try {
    const validKey = checkKeyValue(key);

    if (Object.entries(validKey).length === 0) {
      Logger.error(`Key is valid`);
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
      jsonData['ListDatabase'][key].shift();
      saveDataToJson(jsonData, listFilePath);
      return jsonData['ListDatabase'][key].shift();
    }
  } catch (err) {
    Logger.error(`Error handling the L POP command Controller`);
    return;
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

const checkKeyValue = (key: string) => {
  const result = {
    key,
  };

  return key.length > 0 ? result : {};
};
