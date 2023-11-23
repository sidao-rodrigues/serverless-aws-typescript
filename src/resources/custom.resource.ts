import { AWS } from '@serverless/typescript';

export default {
  defaultStage: '${opt:stage, "dev"}',
  defaultService: '${env:SERVICE, "serverless-aws"}',
  defaultRegion: '${env:AWS_REGION, "us-east-1"}',
  environment: {
    dev: '${file(./src/resources/env.resource.js):dev}',
    qas: '${file(./src/resources/env.resource.js):qas}',
    prod: '${file(./src/resources/env.resource.js):prod}',
  },
  esbuild: {
    bundle: true,
    minify: false,
    sourcemap: true,
    exclude: ['aws-sdk'],
    target: 'node18',
    define: { 'require.resolve': undefined },
    platform: 'node',
    concurrency: 10,
  },
} as AWS['custom'];
