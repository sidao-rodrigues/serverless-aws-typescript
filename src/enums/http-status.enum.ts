type StatusCodeHttp = number | StatusCode;

enum Status {
  SUCCESS = 'success',
  CREATED = 'created',
  BAD_REQUEST = 'bad request',
  UNAUTHORIZED = 'unauthorized',
  PAYMENT_REQUIRED = 'payment required',
  FORBIDDEN = 'forbidden',
  ERROR = 'error',
  INTERAL_SERVER_ERROR = 'internal server error',
}

enum StatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  ERROR = 500,
}

const STATUS_MESSAGES = {
  [StatusCode.OK]: Status.SUCCESS,
  [StatusCode.CREATED]: Status.CREATED,
  [StatusCode.NO_CONTENT]: Status.SUCCESS,
  [StatusCode.BAD_REQUEST]: Status.BAD_REQUEST,
  [StatusCode.UNAUTHORIZED]: Status.UNAUTHORIZED,
  [StatusCode.PAYMENT_REQUIRED]: Status.PAYMENT_REQUIRED,
  [StatusCode.FORBIDDEN]: Status.FORBIDDEN,
  [StatusCode.NOT_FOUND]: Status.BAD_REQUEST,
  [StatusCode.ERROR]: Status.INTERAL_SERVER_ERROR,
}

const getStatusMessage = (statusCode: StatusCodeHttp): Status => {
  return STATUS_MESSAGES[statusCode] ?? Status.ERROR;
}

export {
  Status,
  StatusCode,
  StatusCodeHttp,
  STATUS_MESSAGES,
  getStatusMessage,
}