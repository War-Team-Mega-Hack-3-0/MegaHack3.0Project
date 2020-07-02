const jwt = require('jsonwebtoken');

module.exports.handler = (event, context, callback) => {
  const token = event.authorizationToken;

  if (!token) return callback('Unauthorized');

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const { user } = decodedToken;

    if (user) {
      return callback(null, generatePolicy('user', 'Allow', event.methodArn));
    }

    callback(null, generatePolicy('user', 'Deny', event.methodArn));
  } catch (error) {
    callback('Invalid Token');
  }
};

function generatePolicy(principalId, effect, resource) {
  var authResponse = {};

  authResponse.principalId = principalId;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    stringKey: 'stringval',
    numberKey: 123,
    booleanKey: true,
  };
  return authResponse;
}
