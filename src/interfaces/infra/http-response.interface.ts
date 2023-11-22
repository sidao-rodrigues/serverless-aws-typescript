import { Status, StatusCodeHttp } from "@enums/http-status.enum";

type ResponseHeader = {
  [header: string]: string | number | boolean 
}

interface IResponse<T> {
  status: Status;
  statusCode?: StatusCodeHttp;
  message?: string;
  data?: T | unknown;
}

interface IResponseBody {
  message: string;
  stack?: any[] | string[] | string;
  status?: Status | string;
  statusCode?: number;
}

export {
  IResponse,
  // IResponseAWS,
  IResponseBody,
  ResponseHeader
}

// interface IResponseAWS { // verificar esse -- extends APIGatewayProxyResult {
//   statusCode: number;
//   headers?: ResponseHeader;
//   body: string;
// }
