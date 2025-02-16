import { pino } from "pino";
import { pinoHttp } from "pino-http";

const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

const RESTlogger = pinoHttp({
  transport: {
    target: "pino-pretty",
  },
});

export { logger as generalLogger, RESTlogger as httpLogger };
