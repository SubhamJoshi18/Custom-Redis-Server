import fs from 'fs';
import path from 'path';
import Logger from '../libs/logger';

export const createFileIfNotExists = (filePath: string) => {
  console.log(filePath);
  if (!fs.existsSync(filePath)) {
    Logger.info(`File is Not Created`);
    fs.mkdirSync(filePath);
    Logger.info(`File is Created`);
    return;
  }
  Logger.info(`File is already Created`);
  return;
};

export const getJsonData = (filePath: string) => {
  createFileIfNotExists(filePath);

  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const parse_json = JSON.parse(jsonData);
    return parse_json;
  } catch (err) {
    Logger.error(`Error handling The JSON Data`);
  }
};

export const saveDataToJson = (data: any, filePath: string) => {
  const strinfyData = JSON.stringify(data);
  fs.writeFileSync(filePath, strinfyData);
  return;
};
