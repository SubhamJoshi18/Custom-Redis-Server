import { getJsonData } from '../../fileHandler';
import Logger from '../../libs/logger';
import { listFilePath } from '../../redisConstant/file';

export const lrangeCommandController = (
  key: string,
  start: number,
  end: number
) => {
  try {
    const validKey = checkValidKey(key);

    if (!validKey) {
      Logger.error(`Key is not valid`);
    }

    const checkIndexOutOfBound = validIndexOfBound(key, start);

    if (!checkIndexOutOfBound) {
      return;
    }

    const trimmedData = trimData(key, start, end);
    const convertStr = convertToStr(trimmedData);
    console.log(convertStr);
    return convertStr;
  } catch (err) {
    Logger.error(`Error in l range command`);
    return;
  }
};

const convertToStr = (trimData: string) => {
  let str = '';
  for (const item of trimData) {
    str += item + ' ';
  }
  return str;
};

const trimData = (key: string, start: number, stop: number) => {
  const jsonData = getJsonData(listFilePath);
  const jsonKeyArray = jsonData['ListDatabase'][key];

  const trimData = jsonKeyArray.splice(start, stop);
  return trimData;
};

const validIndexOfBound = (key: string, start: number) => {
  let indexOutOfBound = true;
  const jsonData = getJsonData(listFilePath);

  const jsonKeyArray = jsonData['ListDatabase'][key];

  const jsonKeyArrayLen = jsonKeyArray.length;

  if (start > jsonKeyArrayLen) {
    Logger.error(`Index Out Of Bound , Error`);
    indexOutOfBound = false;
    return;
  }
  return indexOutOfBound;
};

const checkValidKey = (key: string) => {
  return key.length > 0 ? true : false;
};
