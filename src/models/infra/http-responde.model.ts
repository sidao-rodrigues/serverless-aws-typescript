import { StatusCodeHttp, getStatusMessage } from "@enums/http-status.enum";
import { IResponse } from "@interfaces/infra/http-response.interface";
import { APIGatewayProxyResult } from "aws-lambda";

class HttpResponseModel<T> {
  private readonly response: IResponse<T>;

  constructor(data: T = null as T, readonly statusCode: StatusCodeHttp = 200, message: string = null) {
    this.response = {
      ...(message && { message }),
      ...(data && data),
      status: getStatusMessage(statusCode), // deixar ou não?
    };
    this.statusCode = statusCode;
  }

  generateResponse = (): APIGatewayProxyResult => ({ //IResponseAWS
    statusCode: this.statusCode,
    body: JSON.stringify(this.response)
  });
}

export default HttpResponseModel;