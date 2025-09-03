import { ConfigAttributes } from '@src/shared/config/index.config';
import { ConfigService } from '@nestjs/config';
import { IncomingMessage, ServerResponse } from 'http';
import { LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import { SerializedRequest, SerializedResponse } from 'pino';

const getReqLogMsg = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
) => `${req.method} ${req.url} | ${res.statusCode}`;

export const getPinoConfig = (
  config: ConfigService<ConfigAttributes>,
): Params => {
  const loggingConfig = config.get('logging', { infer: true });
  return {
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          messageFormat: '\x1b[36m{msg}\x1b[0m', // Cyan
        },
      },
      level: loggingConfig?.level || 'trace',
      formatters: { level: (label) => ({ level: label }) },
      customLogLevel(_, res, err) {
        if (res.statusCode >= 400 && res.statusCode < 500) {
          return 'warn';
        }

        if (res.statusCode >= 500 || err) {
          return 'error';
        }

        return 'info';
      },
      customSuccessMessage: getReqLogMsg,
      customErrorMessage: getReqLogMsg,
      autoLogging: !loggingConfig?.disableRequestLogging,
      serializers: {
        req: (
          req: SerializedRequest & {
            query: Record<string, string>;
            body?: any;
          },
        ) => {
          const headers = req.headers || {};
          return {
            remoteAddress: req.remoteAddress,
            remotePort: req.remotePort,
            method: req.method,
            url: req.url,
            headers: {
              host: headers.host,
              userAgent: headers['user-agent'],
              accept: headers.accept,
              origin: headers.origin,
            },
            query: req.query,
            body: req.body, // Now logging request body
          };
        },
        res: (res: SerializedResponse) => ({
          statusCode: res.statusCode,
          contentLength: Number(res?.headers['content-length']),
        }),
      },
    },
  };
};

export const loggerModuleOpts: LoggerModuleAsyncParams = {
  inject: [ConfigService],
  useFactory: (c: ConfigService<ConfigAttributes>) => getPinoConfig(c),
};
