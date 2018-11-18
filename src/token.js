const jwt = require("jsonwebtoken");
const secretKey = "RianNaInfoGlobo";
module.exports = {
  createSignature: toBeSigned => {
    return jwt.sign({ username: toBeSigned }, secretKey, {
      expiresIn: 60 * 60 // expires in 24 hours
    });
  },
  verifySignature: token => {
    return jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  }
};
