import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

class Logger {
  private static logFilePath: string = path.join(__dirname, 'app.log');

  private static writeToFile(level: string, message: string) {
    const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}]: ${message}\n`;
    fs.appendFileSync(Logger.logFilePath, logMessage, 'utf8');
  }

  static info(message: string) {
    const level = 'info';
    console.log(`${chalk.blue('INFO')}: ${message}`);
    this.writeToFile(level, message);
  }

  static warn(message: string) {
    const level = 'warn';
    console.warn(`${chalk.yellow('WARN')}: ${message}`);
    this.writeToFile(level, message);
  }

  static error(message: string) {
    const level = 'error';
    console.error(`${chalk.red('ERROR')}: ${message}`);
    this.writeToFile(level, message);
  }

  static success(message: string) {
    const level = 'success';
    console.log(`${chalk.green('SUCCESS')}: ${message}`);
    this.writeToFile(level, message);
  }

  static custom(message: string, color: string) {
    console.log(`${chalk.hex(color)(message)}`);
    this.writeToFile('custom', message);
  }
}

export default Logger;
