import { Status } from "@enums/http-status.enum";

interface SchemaErrorStack {
  schema: string;
  message: string;
}

interface SchemaError {
  message: string;
  stack: SchemaErrorStack[] | any[] | string[] | string;
  status: number;
}

interface ErrorData {
  instancePath: string;
  message: string;
  keyword: string;
  params: any;
  data: any;
  [key: string]: any;
}

interface IAppError {
  message: string;
  stack: any[] | string[] | SchemaErrorStack[] | string;
  status?: Status | string;
  statusCode?: number;
}

export {
  SchemaErrorStack,
  SchemaError,
  ErrorData,
  IAppError
}