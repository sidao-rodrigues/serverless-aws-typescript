import { StatusCode } from '@enums/http-status.enum';
import { ErrorData, SchemaError } from '@interfaces/infra/error.interface';
import { formatHttpErrorResponse } from '@libs/infra/api-gateway.lib';
import middy from '@middy/core';
import type { HttpError } from '@middy/util';
import AppError from '@models/infra/app-error.model';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

interface IOptions {
  logger?: boolean;
}

const generateSchemaError = (error: HttpError): SchemaError => {
  return (error.cause as HttpError)?.data.reduce(
    (acc: SchemaError, item: ErrorData, _: number, arr: ErrorData): SchemaError => {
      //se arr === 1 então não há body. Depois percorre o array com os erros e insere no arr de stacks
      return {
        ...acc,
        message:
          arr.length === 1 && (item.data === null || JSON.stringify(item.data) === '{}')
            ? 'Corpo da requisição é obrigatório'
            : 'Um ou mais campos estão inválidos',
        stack: [
          ...(acc.stack || []),
          {
            schema:
              item.keyword === 'required'
                ? item.params.missingProperty
                : item.instancePath.split('/').pop(),
            message: item.message,
          },
        ],
        status: error.statusCode,
      };
    },
    { message: 'Ocorreu um erro', stack: [] },
  );
};

const schemaErrorMiddleware = (
  options?: IOptions,
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  // const schemaErrorMiddlewareBefore = async (request: middy.Request) => {}
  // const schemaErrorMiddlewareAfter = async (request: middy.Request) => {}

  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<void> => {
    const error = request.error as HttpError;

    if (options?.logger) {
      console.error(`[schemaErrorMiddleware]-(${request.error.message}):`, request.error.cause);
    }

    //caso seja erro de schema
    if (error.expose && error.statusCode === 400) {
      const responseError = generateSchemaError(error);
      request.response = formatHttpErrorResponse(responseError);
    }
  };
  return { onError };
};

const appErrorMiddleware = (
  options?: IOptions,
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<void> => {
    if (options?.logger) {
      if (request.error?.message !== 'Event object failed validation') {
        console.error(`[appErrorMiddleware]`, request.error);
      }
    }

    if (request.error instanceof AppError) {
      const { message, stack, statusCode } = (request.error as AppError).error;
      request.response = formatHttpErrorResponse({ message, stack, status: statusCode });
    } else if (request.error?.message === 'Event object failed validation') {
      //passa para a função de esquema
      console.error('Redirect to [schemaErrorMiddleware]');
    } else {
      const error = request.error;
      const response = {
        message: error.message,
        status: StatusCode.ERROR,
        stack: [error?.cause || error?.stack || error.name],
      };
      request.response = formatHttpErrorResponse(response);
    }
  };
  return { onError };
};

export { appErrorMiddleware, schemaErrorMiddleware };
