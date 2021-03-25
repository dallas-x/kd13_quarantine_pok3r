const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-1007272.okta.com/oauth2/default', // required
});

const authenticationRequired = (req, res, next) => {
  const accessToken = req.headers.authorization || '';
  const expectedAudience = 'api://default';

  if (!accessToken) {
    res.status(401);
    return next('Unauthorized');
  }

  return oktaJwtVerifier
    .verifyAccessToken(accessToken, expectedAudience)
    .then((jwt) => {
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
      res.status(401).send(err.message);
    });
};

export default authenticationRequired;
