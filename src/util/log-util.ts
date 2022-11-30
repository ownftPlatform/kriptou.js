/** ***********************
 * MIT
 * Copyright (c) 2022 OwNFT Market
 **************************/

export type LogTypes = 'debug' | 'all' | 'info' | 'warn' | 'error' | 'fatal' | 'off';

const levels = {
    ALL: { value: Number.MIN_VALUE, colour: 'grey' },
    TRACE: { value: 5000, colour: 'blue' },
    DEBUG: { value: 10000, colour: 'cyan' },
    INFO: { value: 20000, colour: 'green' },
    WARN: { value: 30000, colour: 'yellow' },
    ERROR: { value: 40000, colour: 'red' },
    FATAL: { value: 50000, colour: 'magenta' },
    MARK: { value: 9007199254740992, colour: 'grey' }, // 2^53
    OFF: { value: Number.MAX_VALUE, colour: 'grey' }
};

class Logger {
    private level: { value: number; colour: string };
    constructor(private readonly category: string, _level: LogTypes, private isDefaultOverridden: boolean) {
        this.updateLevel(_level, true);
    }

    public debug(...args) {
        if (this.level.value <= levels.DEBUG.value) {
            // eslint-disable-next-line no-console
            console.log(`[DEBUG] ${this.category}:`, ...args);
        }
    }

    public info(...args) {
        if (this.level.value <= levels.INFO.value) {
            // eslint-disable-next-line no-console
            console.info(`[INFO] ${this.category}:`, ...args);
        }
    }
    public warn(...args) {
        if (this.level.value <= levels.WARN.value) {
            // eslint-disable-next-line no-console
            console.warn(`[WARN] ${this.category}:`, ...args);
        }
    }
    public error(...args) {
        if (this.level.value <= levels.ERROR.value) {
            // eslint-disable-next-line no-console
            console.error(`[ERROR] ${this.category}:`, ...args);
        }
    }

    public updateLevel(level: LogTypes, forceLevel: boolean = false): void {
        if (this.isDefaultOverridden && !forceLevel) return;
        switch (level) {
            case 'all':
                this.level = levels.ALL;
                break;
            case 'debug':
                this.level = levels.DEBUG;
                break;
            case 'info':
                this.level = levels.INFO;
                break;
            case 'warn':
                this.level = levels.WARN;
                break;
            case 'error':
                this.level = levels.WARN;
                break;
            case 'fatal':
                this.level = levels.FATAL;
                break;
            case 'off':
                this.level = levels.OFF;
                break;
        }
    }
}

export class LogUtil {
    // Log level that applies across the whole app
    private static LOG_LEVEL: LogTypes = 'info';

    public readonly logLevelDebug: string = 'debug';
    public readonly logLevelInfo: string = 'info';

    private loggers: Map<string, Logger> = new Map();

    public getLogger(category?: string, level?: LogTypes): Logger {
        const logger: Logger = new Logger(category, level !== undefined ? level : LogUtil.LOG_LEVEL, level !== undefined);
        this.loggers.set(category, logger);
        return logger;
    }

    public updateLevel(level: LogTypes): void {
        LogUtil.LOG_LEVEL = level;
        this.loggers.forEach((logger) => logger.updateLevel(LogUtil.LOG_LEVEL));
    }
}

const logUtil: LogUtil = new LogUtil();
export { logUtil };
