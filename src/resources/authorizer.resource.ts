export default {
  ...(!process.env.IS_OFFLINE && { integration: 'lambda' }),
  authorizer: {
    arn:
      'arn:aws:lambda:${self:provider.environment.AWS_AUTH_REGION}:${self:provider.environment.AWS_ACCOUNT_ID}' +
      ':function:${self:provider.environment.AWS_AUTH_PROJECT}-function-lambda-test-${self:provider.stage}',
    resultTtlInSeconds: 0,
    identitySource: 'method.request.header.Authorization',
    type: 'request',
  },
};
