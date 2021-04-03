export default {
  oidc: {
    issuer: `https://${process.env.OKTA_DOMAIN}.okta.com/oauth2/default`,
    clientId: process.env.OKTA_REACT_CLIENTID,
    redirectUri: process.env.REDIRECT_URI,
  },
};
