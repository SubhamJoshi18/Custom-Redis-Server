import { getJsonData } from '../../fileHandler';
import Logger from '../../libs/logger';
import { setFilePath } from '../../redisConstant/file';

export const sisMemberCommandController = (key: string, value: any = null) => {
  try {
    const jsonData = getJsonData(setFilePath);
    const validKey = checkKeyExists(jsonData, key);
    if (!validKey) {
      Logger.error(`Key is not valid : ${key}`);
      return;
    }

    return key && value
      ? handleKeyAndValue(jsonData, key, value)
      : handleIsMemberOnly(jsonData, key);
  } catch (err) {
    Logger.error(`Error in sIsMember Controller : ${key}`);
    return;
  }
};

const handleIsMemberOnly = (jsonData: any, key: string) => {
  const Validvalue = [];
  const setDatabase = jsonData['SetDatabase'];

  for (const [keys, value] of Object.entries(setDatabase)) {
    console.log(keys, key);
    if (keys === key) {
      Validvalue.push(value);
    }
  }
  console.log(Validvalue);
  const flatValidValue = Validvalue.flat();
  const parsedStr = parseToString(flatValidValue);
  return parsedStr;
};

const parseToString = (data: Array<any>) => {
  let str = '';
  for (const item of data) {
    str = item + ' ';
  }
  return str;
};

const handleKeyAndValue = (jsonData: any, key: string, value: string) => {
  const SetDatabase = jsonData['SetDatabase'];
  let isValue = [];

  for (const [keys, values] of Object.entries(SetDatabase)) {
    if (keys.includes(key)) {
      for (const item of values as any) {
        if (item === value) {
          isValue.push(value);
        }
      }
    }
  }
  return isValue.length > 0 ? 1 : 0;
};

const checkKeyExists = (jsonData: any, key: string) => {
  let validKey = [false];
  for (const [keys, values] of Object.entries(jsonData['SetDatabase'])) {
    console.log(keys);
    if (keys.includes(key)) {
      validKey.push(key as any);
    }
  }

  return validKey.length > 0;
};
