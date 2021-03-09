// import passport from 'passport';
// import { OktaStrategy } from 'passport-okta-oauth';

// require('dotenv').config();
// const strategy = () => {
//   passport.use(
//     new OktaStrategy(
//       {
//         audience: process.env.OKTA_Audience,
//         clientID: process.env.OKTA_CLIENTID,
//         clientSecret: process.env.OKTA_CLIENTSECRET,
//         idp: process.env.OKTA_IDP,
//         scope: ['openid', 'email', 'profile'],
//         response_type: 'code',
//         callbackURL: '/auth/okta/callback',
//       },
//       (accessToken, refreshToken, profile, done) => {
//         return profile;
//       },
//     ),
//   );
// };

// export default strategy;

// // PROFILE OBJECT
// // profile = {
// //     provider: 'okta-social',
// //     name: {
// //       fullName:   'John Smith',
// //       familyName: 'Smith',
// //       givenName:  'John'
// //     },
// //     emails: [{value: 'john.smith@example.com'}],
// //     _raw: "\{...\}"
// //     _json: {...}
// //   }
