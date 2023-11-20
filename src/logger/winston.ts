import winston, { createLogger, format, transports } from 'winston';

const { errors } = format;
const errorsFormat = errors({ stack: true });

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    sql: 4,
    debug: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    sql: 'blue',
    debug: 'gray',
  },
};

winston.addColors(logLevels.colors);

const logger = createLogger({
  levels: logLevels.levels,
  exitOnError: false,
  format: format.combine(
    //   format.colorize(),
    format.align(),
    format.timestamp(),
    format.printf(({ timestamp, level, message, metadata }) => {
      return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
    }),
    errorsFormat
  ),
  transports: [new transports.Console()],
  defaultMeta: {
    service: 'temporal-api',
  },
});

export { logger };
