import { StatusCode, getStatusMessage } from "@enums/http-status.enum";
import { IAppError } from "@interfaces/infra/error.interface";

class AppError {
  private readonly _error: IAppError;

  constructor(message: string, statusCode: StatusCode | number = 402, stack: any[] = []) {
    this._error = {
      message,
      status: getStatusMessage(statusCode),
      stack,
      statusCode
    };
  }
  
  get error(): IAppError {
    return this._error;
  }

  /*setBodyVariable = (variable: string, value: string): void => {
    this.body[variable] = value;
  }

  generateResponse = (): IResponse => ({
    statusCode: this.statusCode,
    headers: RESPONSE_HEADERS,
    body: JSON.stringify(this.body)
  });

  get message(): string {
    return this.body.message;
  }*/

}

export default AppError;