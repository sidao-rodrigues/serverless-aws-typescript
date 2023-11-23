import functions from '@functions/index';
import custom from '@resources/custom.resource';
import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: '${self:custom.defaultService}', //-${opt:stage, self:custom.defaultStage}',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    stage: '${self:custom.defaultStage}',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: '${self:custom.environment.${self:provider.stage}}' as any,
    region: '${self:provider.environment.AWS_REGION}' as any,
  },
  functions,
  custom,
  package: { individually: true }, //, exclude: ['**/*']
  // useDotenv: true,
  // variablesResolutionMode: '20210219',
};

module.exports = serverlessConfiguration;
