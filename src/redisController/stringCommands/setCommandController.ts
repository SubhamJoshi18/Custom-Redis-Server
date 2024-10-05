import { stringFilePath } from '../../redisConstant/file';
import {
  createFileIfNotExists,
  getJsonData,
  saveDataToJson,
} from '../../fileHandler';
import Logger from '../../libs/logger';
import { json } from 'stream/consumers';

export const setCommandFunction = (key: string, value: string) => {
  let destructValue = [];

  try {
    const result = checkValidKeyAndValue(key, value);

    for (const [key, value] of Object.entries(result)) {
      destructValue.push(value);
    }
    const parse_result = removeFirstElement(destructValue);

    const jsonData = getJsonData(stringFilePath);

    if (jsonData['String_Database'][key]) {
      Logger.info(
        `${jsonData['String_Database'][key]} already exists, So Replacing it`
      );
      jsonData['String_Database'][key] = [value];
    }

    jsonData['String_Database'][key] = [value];

    saveDataToJson(jsonData, stringFilePath);
  } catch (err) {
    Logger.error(`Error in handing set command Function`);
    return;
  }
};

const checkValidKeyAndValue = (key: string, value: string) => {
  if (key.length > 0 && value.length > 0) {
    return {
      key: key,
      value: value,
    };
  } else {
    return {};
  }
};

const removeFirstElement = (keyValue: Array<any>) => {
  const deResult = {
    key: keyValue[0],
    value: keyValue[1],
  };

  return Object.entries(deResult).length > 0 ? deResult : null;
};
