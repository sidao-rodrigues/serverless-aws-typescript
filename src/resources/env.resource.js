const getEnvOrDefaultValue = (key, defaultValue) => process.env?.[key] ?? defaultValue;

const DEFAULT_ENV = {
  AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
  NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
  PROJECT: '${self:service}-${opt:stage, self:custom.defaultStage}',
  AWS_AUTH_PROJECT: 'project',
  AWS_AUTH_REGION: 'us-east-1',
};

const ENVIRONMENTS = {
  dev: {
    ...DEFAULT_ENV,
    SERVICE: getEnvOrDefaultValue('SERVICE', '${self:service}'),
    AWS_REGION: getEnvOrDefaultValue('AWS_REGION', '${self:custom.defaultRegion}'),
    AWS_ACCOUNT_ID: getEnvOrDefaultValue('AWS_ACCOUNT_ID', 'XXXXXXXXXXXX'),
    AWS_USER_POOL_ID: getEnvOrDefaultValue('AWS_USER_POOL_ID', 'us-east-1_AAAAAAAA'),
  },
  qas: {
    ...DEFAULT_ENV,
    SERVICE: getEnvOrDefaultValue('SERVICE', '${self:service}'),
    AWS_REGION: getEnvOrDefaultValue('AWS_REGION', '${self:custom.defaultRegion}'),
    AWS_ACCOUNT_ID: getEnvOrDefaultValue('AWS_ACCOUNT_ID', 'YYYYYYYYYYYY'),
    AWS_USER_POOL_ID: getEnvOrDefaultValue('AWS_USER_POOL_ID', 'us-east-1_BBBBBBBB'),
  },
  prod: {
    ...DEFAULT_ENV,
    SERVICE: getEnvOrDefaultValue('SERVICE', '${self:service}'),
    AWS_REGION: getEnvOrDefaultValue('AWS_REGION', '${self:custom.defaultRegion}'),
    AWS_ACCOUNT_ID: getEnvOrDefaultValue('AWS_ACCOUNT_ID', 'ZZZZZZZZZZZZ'),
    AWS_USER_POOL_ID: getEnvOrDefaultValue('AWS_USER_POOL_ID', 'us-east-1_CCCCCCCC'),
  },
};

module.exports = {
  dev: ENVIRONMENTS.dev,
  qas: ENVIRONMENTS.qas,
  prod: ENVIRONMENTS.prod,
};
