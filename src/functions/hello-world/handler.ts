import { formatHttpSuccessResponse } from '@libs/infra/api-gateway.lib';
import { middyfyGenerator } from '@libs/infra/lambda-middy.lib';
import { StatusCode } from '@enums/http-status.enum';
import { APIGatewayProxyResult, Handler } from 'aws-lambda';
import schema from '@schemas/hello-world/create.schema';
import { HelloWorldCreateReq } from '@interfaces/functions/hello-world.interface';
import { IRequestAWS } from '@interfaces/infra/http-request.interface';

const helloWorldHandler: Handler = async (event: IRequestAWS<HelloWorldCreateReq>): Promise<APIGatewayProxyResult> => {
  const response = event.body;
  return formatHttpSuccessResponse({
    data: response,
    statusCode: StatusCode.CREATED
  })
};

export const main = middyfyGenerator(helloWorldHandler, schema);
