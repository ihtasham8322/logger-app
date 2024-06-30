import * as fs from "fs";
import * as path from "path";

export enum LogLevel {
  Verbose = "VERBOSE",
  Info = "INFO",
  Warning = "WARNING",
  Error = "ERROR",
}

interface LoggerConfig {
  logToFile?: boolean;
  logFilePath?: string;
}

interface LoggerInterface {
  log(level: LogLevel, message: string): void;
  verbose(message: string): void;
  info(message: string): void;
  warning(message: string): void;
  error(message: string): void;
}

export class Logger implements LoggerInterface {
  private logToFile: boolean;
  private logFilePath: string;

  constructor(config: LoggerConfig) {
    this.logToFile = config.logToFile ?? false;
    this.logFilePath = config.logFilePath ?? "app_log.txt";
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  private async writeToConsole(message: string) {
    console.log(message);
  }

  private async writeToFile(message: string) {
    try {
      const filePath = path.resolve(this.logFilePath);
      await fs.promises.appendFile(filePath, message + "\n");
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to write to file: ${error.message}`);
      } else {
        console.error("Failed to write to file: Unknown error");
      }
    }
  }

  public async log(level: LogLevel, message: string): Promise<void> {
    const formattedMessage = this.formatMessage(level, message);
    await this.writeToConsole(formattedMessage);
    if (this.logToFile) {
      await this.writeToFile(formattedMessage);
    }
  }

  public async verbose(message: string): Promise<void> {
    await this.log(LogLevel.Verbose, message);
  }

  public async info(message: string): Promise<void> {
    await this.log(LogLevel.Info, message);
  }

  public async warning(message: string): Promise<void> {
    await this.log(LogLevel.Warning, message);
  }

  public async error(message: string): Promise<void> {
    await this.log(LogLevel.Error, message);
  }
}
