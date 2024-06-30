import { Logger } from "./Logger";
import * as fs from "fs";

const configPath = "./config.json";
const rawConfig = fs.readFileSync(configPath, "utf-8");
const config = JSON.parse(rawConfig);

const logger = new Logger(config);

async function runLogging() {
  await logger.verbose("This is a verbose message");
  await logger.info("This is an info message");
  await logger.warning("This is a warning message");
  await logger.error("This is an error message");
}

runLogging();
