import middy from '@middy/core';
import cors from '@middy/http-cors';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpSecurityHeaders from '@middy/http-security-headers';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import localize from 'ajv-ftl-i18n';
import { Handler } from 'aws-lambda';

import { appErrorMiddleware, schemaErrorMiddleware } from '../middlewares/error.middleware';

export const middyfyGenerator = (handler: Handler, schema: object): middy.MiddyfiedHandler => {
  return middy(handler)
    .use(
      cors({
        credentials: true,
      }),
    )
    .use(
      httpSecurityHeaders({
        strictTransportSecurity: {
          maxAge: 15552001,
          includeSubDomains: true,
          preload: true,
        },
      }),
    )
    .use(middyJsonBodyParser())
    .use(
      validator({
        eventSchema: transpileSchema(schema, { verbose: true }),
        defaultLanguage: 'pt-BR',
        languages: {
          'pt-BR': localize['pt-BR'],
        },
      }),
    )
    .use(schemaErrorMiddleware({ logger: true }))
    .use(appErrorMiddleware({ logger: true }));
};
