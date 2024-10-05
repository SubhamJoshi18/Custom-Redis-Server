import { getJsonData } from '../../fileHandler';
import Logger from '../../libs/logger';
import { listFilePath } from '../../redisConstant/file';

export const lpopCommandController = (key: string) => {
  try {
    const validKey = checkKeyValue(key);

    if (Object.entries(validKey).length === 0) {
      Logger.error(`Key is valid`);
      return;
    }

    const getJSONData = getJsonData(listFilePath);
  } catch (err) {}
};

const checkKeyExists = (key: string) => {
  const jsonData = getJsonData(listFilePath);
  

};

const checkKeyValue = (key: string) => {
  const result = {
    key,
  };

  return key.length > 0 ? result : {};
};
