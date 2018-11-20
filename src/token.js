/* eslint no-console: ["error", { allow: ["log"] }] */
const jwt = require('jsonwebtoken');

const secretKey = 'RianNaInfoGlobo';
module.exports = {
  createSignature: toBeSigned => jwt.sign({ username: toBeSigned }, secretKey, {
    expiresIn: 60 * 60, // expires in 24 hours
  }),
  verifySignature: token => jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log('Signature invalid: ', decoded);
      return false;
    }
    return true;
  }),
};
