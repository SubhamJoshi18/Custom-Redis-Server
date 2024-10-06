import { getJsonData, saveDataToJson } from '../../fileHandler';
import Logger from '../../libs/logger';
import { hashFilePath } from '../../redisConstant/file';

export const hsetCommandController = (data: Array<any>) => {
  const validLength = checkLength(data);
  const key = data[1];
  const trimData = removeKey(data);
  const trimmedData = [trimData];

  if (!validLength) {
    Logger.error(`Length is not valid , The data is empty`);
    return;
  }

  const jsonData = getJsonData(hashFilePath);
  console.log(trimData);

  const content = jsonData['HashDatabase'];

  if (!content.hasOwnProperty(key) || !content[key]) {
    jsonData['HashDatabase'][key] = {};

    for (let i = 0; i < trimData.length; i += 2) {
      const trimKey = trimData[i];
      const trimValue = trimData[i + 1];

      console.log(trimKey, trimValue);
      if (trimKey && trimValue !== undefined) {
        console.log('=>', trimKey, trimValue);
        jsonData['HashDatabase'][key][trimKey as any] = trimValue;
      }
    }
    saveDataToJson(jsonData, hashFilePath);
    const updatedJsonData = getJsonData(hashFilePath);
    return Object.entries(updatedJsonData['HashDatabase'][key]).length;
  }
};

const removeKey = (data: Array<any>) => {
  const deepCopyData = [...data];
  deepCopyData.shift();
  return deepCopyData;
};
const checkLength = (data: Array<any>) => {
  return data.length > 0;
};
