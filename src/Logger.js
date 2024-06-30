"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.LogLevel = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
var LogLevel;
(function (LogLevel) {
    LogLevel["Verbose"] = "VERBOSE";
    LogLevel["Info"] = "INFO";
    LogLevel["Warning"] = "WARNING";
    LogLevel["Error"] = "ERROR";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
class Logger {
    constructor(config) {
        var _a, _b;
        this.logToFile = (_a = config.logToFile) !== null && _a !== void 0 ? _a : false;
        this.logFilePath = (_b = config.logFilePath) !== null && _b !== void 0 ? _b : "app_log.txt";
    }
    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}] ${message}`;
    }
    writeToConsole(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(message);
        });
    }
    writeToFile(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filePath = path.resolve(this.logFilePath);
                yield fs.promises.appendFile(filePath, message + "\n");
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to write to file: ${error.message}`);
                }
                else {
                    console.error("Failed to write to file: Unknown error");
                }
            }
        });
    }
    log(level, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const formattedMessage = this.formatMessage(level, message);
            yield this.writeToConsole(formattedMessage);
            if (this.logToFile) {
                yield this.writeToFile(formattedMessage);
            }
        });
    }
    verbose(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.log(LogLevel.Verbose, message);
        });
    }
    info(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.log(LogLevel.Info, message);
        });
    }
    warning(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.log(LogLevel.Warning, message);
        });
    }
    error(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.log(LogLevel.Error, message);
        });
    }
}
exports.Logger = Logger;
