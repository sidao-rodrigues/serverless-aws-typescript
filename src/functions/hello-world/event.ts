import { handlerPath } from '@libs/infra/handler-resolver.lib';
import authorizer from '@resources/authorizer.resource';
import layer from '@resources/layer.resource';
import type { AWS } from '@serverless/typescript';

export default {
  ...layer,
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        ...authorizer,
        method: 'post',
        path: 'hello-world',
      },
    },
  ],
} as AWS['functions'][''];
