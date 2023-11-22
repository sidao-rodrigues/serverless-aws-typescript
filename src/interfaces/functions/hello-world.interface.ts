import createSchema from '@schemas/hello-world/create.schema';
import { FromSchema } from 'json-schema-to-ts';

type HelloWorldCreateReq = FromSchema<typeof createSchema.properties.body>;

export {
  HelloWorldCreateReq
}