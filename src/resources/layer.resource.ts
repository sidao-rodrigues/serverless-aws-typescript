import { AWS } from '@serverless/typescript';

export default {
  layers: [{ Ref: 'NodeModulesLambdaLayer' }],
} as AWS['functions'][''];
