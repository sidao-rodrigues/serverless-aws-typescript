// import schema from './schema';
import { handlerPath } from '@libs/infra/handler-resolver.lib';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'hello-world',
      },
    },
  ],
}
