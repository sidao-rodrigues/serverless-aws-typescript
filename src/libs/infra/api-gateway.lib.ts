/*import type { APIGatewayProxyEvent, APIGatewayProxyResult, Handler } from "aws-lambda"
import type { FromSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & { body: FromSchema<S> }
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<ValidatedAPIGatewayProxyEvent<S>, APIGatewayProxyResult>*/

import { Status, getStatusMessage } from "@enums/http-status.enum"
import { IResponse } from "@interfaces/infra/http-response.interface"
import { SchemaError } from "@interfaces/infra/error.interface";
import { APIGatewayProxyResult } from "aws-lambda";

type IResponseOmit<T> = Omit<IResponse<T>, 'status'> & { status?: Status };

const formatHttpErrorResponse = ({ message, stack, status }: SchemaError): APIGatewayProxyResult => { // IResponseAWS
  const body = {
    message,
    stack,
    status: getStatusMessage(status),
  };

  return {
    statusCode: status,
    body: JSON.stringify(body)
  };
}

const formatHttpSuccessResponse = <T>({ message, data, status, statusCode }: IResponseOmit<T>): APIGatewayProxyResult => { //IResponseAWS
  const body = {
    ...(message && { message }),
    ...(data && { data }),
    status: status || getStatusMessage(statusCode), // deixar ou não?
  };

  return {
    statusCode: statusCode,
    body: JSON.stringify(body)
  };
}

export {
  formatHttpErrorResponse,
  formatHttpSuccessResponse,
}
